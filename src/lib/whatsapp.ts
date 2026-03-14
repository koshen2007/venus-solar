/**
 * Venus Solar Energy — WhatsApp Notification Utility
 * Uses Twilio's WhatsApp API to send instant alerts to the admin.
 *
 * Required .env variables:
 *   TWILIO_ACCOUNT_SID      — Your Twilio Account SID
 *   TWILIO_AUTH_TOKEN       — Your Twilio Auth Token
 *   TWILIO_WHATSAPP_FROM    — Twilio WhatsApp sender (e.g. whatsapp:+14155238886)
 *   ADMIN_WHATSAPP_NUMBER   — Admin's number (e.g. whatsapp:+919024424633)
 */

const accountSid  = process.env.TWILIO_ACCOUNT_SID;
const authToken   = process.env.TWILIO_AUTH_TOKEN;
const fromNumber  = process.env.TWILIO_WHATSAPP_FROM;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

function isTwilioConfigured(): boolean {
  return !!(
    accountSid &&
    authToken &&
    fromNumber &&
    adminNumber &&
    !accountSid.startsWith('ACxxx') &&
    authToken !== 'your_auth_token_here'
  );
}

export async function sendWhatsAppToAdmin(message: string): Promise<void> {
  if (!isTwilioConfigured()) {
    // Graceful fallback — just log, never crash the form submission
    console.log('[WhatsApp Notification — NOT SENT] Twilio not configured yet.');
    console.log('[Message Preview]:', message);
    return;
  }

  try {
    // Dynamically import Twilio to avoid build-time issues when credentials aren't set
    const twilio = (await import('twilio')).default;
    const client = twilio(accountSid!, authToken!);

    await client.messages.create({
      body: message,
      from: fromNumber!,
      to: adminNumber!,
    });

    console.log('[WhatsApp Notification] ✅ Message sent to admin successfully.');
  } catch (error) {
    // Never let a Twilio error break the actual form submission
    console.error('[WhatsApp Notification] ❌ Failed to send message:', error);
  }
}

// ─── Message Templates ──────────────────────────────────────────────────────

export function buildLeadMessage(data: {
  name: string;
  phone: string;
  address: string;
}): string {
  return [
    `🌟 *Venus Solar Energy — New Lead!*`,
    ``,
    `📋 *Contact Form Submission*`,
    `👤 Name: ${data.name}`,
    `📞 Phone: ${data.phone}`,
    `📍 Address: ${data.address}`,
    ``,
    `⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ``,
    `👉 Reply to this customer ASAP to convert this lead!`,
  ].join('\n');
}

export function buildServiceMessage(data: {
  name: string;
  phone: string;
  address: string;
  issue: string;
}): string {
  return [
    `🔧 *Venus Solar Energy — Service Request!*`,
    ``,
    `📋 *Maintenance Request Submitted*`,
    `👤 Name: ${data.name}`,
    `📞 Phone: ${data.phone}`,
    `📍 Address: ${data.address}`,
    `🛠 Issue: ${data.issue}`,
    ``,
    `⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ``,
    `👉 Schedule a technician visit at your earliest convenience!`,
  ].join('\n');
}
