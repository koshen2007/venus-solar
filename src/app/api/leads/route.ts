import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { sendWhatsAppToAdmin, buildLeadMessage } from '@/lib/whatsapp'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, address } = body

    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: { name, phone, address },
    })

    // 🔔 Fire WhatsApp alert to admin (non-blocking — never delays the response)
    sendWhatsAppToAdmin(buildLeadMessage({ name, phone, address })).catch(() => {});

    return NextResponse.json({ success: true, data: lead })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
