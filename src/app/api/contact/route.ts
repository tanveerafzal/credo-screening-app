import { NextRequest, NextResponse } from 'next/server';
import { BRAND } from '@/lib/brand';
import { CONTACT_EMAIL, getSmtpFromAddress, getSmtpTransporter, isSmtpConfigured } from '@/lib/smtp';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    if (!isSmtpConfigured()) {
      console.error('[Contact] SMTP not configured');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }

    const body = await req.json();
    const { name, email, company, phone, message, plan } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeCompany = company ? escapeHtml(String(company)) : '';
    const safePhone = phone ? escapeHtml(String(phone)) : '';
    const safePlan = plan ? escapeHtml(String(plan)) : '';
    const safeMessage = escapeHtml(String(message));

    const subject = plan === 'corporate'
      ? `Corporate Plan Inquiry from ${company || name}`
      : `Contact Form: ${name}`;

    const htmlBody = `
      <h2>${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Name</td><td style="padding:8px;">${safeName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Email</td><td style="padding:8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        ${safeCompany ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Company</td><td style="padding:8px;">${safeCompany}</td></tr>` : ''}
        ${safePhone ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Phone</td><td style="padding:8px;">${safePhone}</td></tr>` : ''}
        ${safePlan ? `<tr><td style="padding:8px;font-weight:bold;color:#374151;">Plan</td><td style="padding:8px;">${safePlan}</td></tr>` : ''}
      </table>
      <h3 style="color:#374151;margin-top:20px;">Message</h3>
      <p style="color:#4b5563;line-height:1.6;">${safeMessage.replace(/\n/g, '<br>')}</p>
      <hr style="margin-top:30px;border:none;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;">Sent from ${BRAND.name} contact form</p>
    `;

    const textBody = [
      subject,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      plan ? `Plan: ${plan}` : null,
      '',
      'Message:',
      message,
      '',
      `Sent from ${BRAND.name} contact form`,
    ]
      .filter(Boolean)
      .join('\n');

    const transporter = getSmtpTransporter();
    await transporter.sendMail({
      from: getSmtpFromAddress(),
      to: CONTACT_EMAIL,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: 'Thank you! We will be in touch shortly.' });
  } catch (err) {
    console.error('[Contact] Error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
