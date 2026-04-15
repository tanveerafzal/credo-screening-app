import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'sales@credoscreening.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, plan } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const subject = plan === 'enterprise'
      ? `Enterprise Inquiry from ${company || name}`
      : `Contact Form: ${name}`;

    const htmlBody = `
      <h2>${subject}</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Name</td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
        ${company ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Company</td><td style="padding:8px;">${company}</td></tr>` : ''}
        ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Phone</td><td style="padding:8px;">${phone}</td></tr>` : ''}
        ${plan ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Plan</td><td style="padding:8px;">${plan}</td></tr>` : ''}
      </table>
      <h3 style="color:#374151;margin-top:20px;">Message</h3>
      <p style="color:#4b5563;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
      <hr style="margin-top:30px;border:none;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;">Sent from CredoScreening contact form</p>
    `;

    if (RESEND_API_KEY) {
      // Send via Resend
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CredoScreening <noreply@credoscreening.com>',
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('[Contact] Resend error:', err);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }
    } else {
      // No email provider — log to console
      console.log('[Contact] Form submission (no RESEND_API_KEY configured):');
      console.log(`  Name: ${name}, Email: ${email}, Company: ${company}, Plan: ${plan}`);
      console.log(`  Message: ${message}`);
    }

    return NextResponse.json({ success: true, message: 'Thank you! We will be in touch shortly.' });
  } catch (err) {
    console.error('[Contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
