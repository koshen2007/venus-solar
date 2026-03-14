import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { sendWhatsAppToAdmin, buildServiceMessage } from '@/lib/whatsapp'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, address, issue } = body

    if (!name || !phone || !address || !issue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: { name, phone, address, issue },
    })

    // 🔔 Fire WhatsApp alert to admin (non-blocking — never delays the response)
    sendWhatsAppToAdmin(buildServiceMessage({ name, phone, address, issue })).catch(() => {});

    return NextResponse.json({ success: true, data: serviceRequest })
  } catch (error) {
    console.error('Error creating service request:', error)
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: requests })
  } catch (error) {
    console.error('Error fetching service requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
