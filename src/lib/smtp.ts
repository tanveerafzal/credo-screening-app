import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { BRAND } from '@/lib/brand';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || BRAND.salesEmail;

export function isSmtpConfigured(): boolean {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
}

export function getSmtpFromAddress(): string {
  return (
    process.env.CONTACT_FROM_EMAIL ||
    process.env.SMTP_FROM_EMAIL ||
    (SMTP_USER ? `${BRAND.name} <${SMTP_USER}>` : `${BRAND.name} <${BRAND.salesEmail}>`)
  );
}

let transporter: Transporter | null = null;

export function getSmtpTransporter(): Transporter {
  if (!isSmtpConfigured()) {
    throw new Error('SMTP not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2',
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 30000,
    });
  }

  return transporter;
}
