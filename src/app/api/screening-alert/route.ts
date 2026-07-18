import { NextRequest, NextResponse } from 'next/server';
import { BRAND } from '@/lib/brand';
import { getContactEmail, getSmtpFromAddress, getSmtpTransporter, isSmtpConfigured } from '@/lib/smtp';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Fire-and-forget alert: notifies the admin whenever a visitor attempts a
 * screening on the public Free Screening tool — including logged-out visitors.
 * Used to monitor demand. Failures are swallowed so they never affect the
 * visitor's screening flow.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const dateOfBirth = body.dateOfBirth ? String(body.dateOfBirth).trim() : '';
    const nationality = body.nationality ? String(body.nationality).trim() : '';
    const loggedIn = Boolean(body.loggedIn);
    const company = body.company ? String(body.company).trim() : '';
    const outcome = body.outcome ? String(body.outcome).trim() : 'attempted';

    if (!firstName && !lastName) {
      return NextResponse.json({ error: 'Nothing to report' }, { status: 400 });
    }

    if (!isSmtpConfigured()) {
      // Still record the attempt in server logs even if email is unavailable.
      console.warn('[ScreeningAlert] SMTP not configured — attempt not emailed:', {
        firstName, lastName, loggedIn, outcome,
      });
      return NextResponse.json({ ok: true, emailed: false });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || 'unknown';
    const when = new Date().toISOString();

    const safe = {
      name: escapeHtml(`${firstName} ${lastName}`.trim()),
      dob: escapeHtml(dateOfBirth || '—'),
      nationality: escapeHtml(nationality || '—'),
      status: loggedIn ? 'Signed in' : 'Not signed in',
      company: escapeHtml(company || '—'),
      outcome: escapeHtml(outcome),
      ip: escapeHtml(ip),
      userAgent: escapeHtml(userAgent),
      referer: escapeHtml(referer),
      when: escapeHtml(when),
    };

    const subject = `Screening attempt: ${firstName} ${lastName}`.trim();

    const htmlBody = `
      <h2>New Free Screening attempt</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Searched name</td><td style="padding:8px;">${safe.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Date of birth</td><td style="padding:8px;">${safe.dob}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Nationality</td><td style="padding:8px;">${safe.nationality}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Visitor</td><td style="padding:8px;">${safe.status}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Company</td><td style="padding:8px;">${safe.company}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Outcome</td><td style="padding:8px;">${safe.outcome}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">IP</td><td style="padding:8px;">${safe.ip}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">Referer</td><td style="padding:8px;">${safe.referer}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">User agent</td><td style="padding:8px;">${safe.userAgent}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#374151;">When (UTC)</td><td style="padding:8px;">${safe.when}</td></tr>
      </table>
      <hr style="margin-top:30px;border:none;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;">Sent from the ${BRAND.name} Free Screening tool</p>
    `;

    const textBody = [
      'New Free Screening attempt',
      '',
      `Searched name: ${firstName} ${lastName}`.trim(),
      `Date of birth: ${dateOfBirth || '—'}`,
      `Nationality: ${nationality || '—'}`,
      `Visitor: ${loggedIn ? 'Signed in' : 'Not signed in'}`,
      `Company: ${company || '—'}`,
      `Outcome: ${outcome}`,
      `IP: ${ip}`,
      `Referer: ${referer}`,
      `User agent: ${userAgent}`,
      `When (UTC): ${when}`,
      '',
      `Sent from the ${BRAND.name} Free Screening tool`,
    ].join('\n');

    const transporter = getSmtpTransporter();
    const to = getContactEmail();
    const from = getSmtpFromAddress();

    await transporter.sendMail({ from, to, subject, text: textBody, html: htmlBody });

    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error('[ScreeningAlert] Error:', err);
    // Never surface this to the visitor — the alert is best-effort.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
