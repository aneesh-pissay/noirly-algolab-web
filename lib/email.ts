import nodemailer from 'nodemailer';
import { darkPalette } from '@/lib/theme-colors';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@noirly-codelab.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const BRAND_NAME = 'Noirly AlgoLab';
const BRAND_TAGLINE = 'Visual DSA Learning';

const c = darkPalette;

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  debug: true,
  logger: true,
});

transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter verification failed:', error.message);
    console.log('💡 Email sending will be skipped. Check your SMTP settings.');
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

/** Prefer first name, then a readable name from email, otherwise a neutral greeting. */
export function formatGreetingName(
  email: string,
  options?: { firstName?: string | null; username?: string }
): string {
  const first = options?.firstName?.trim();
  if (first) return first;

  const local = (email.split('@')[0] ?? '').trim();
  const parts = local.split(/[._-]+/).filter((p) => p.length > 1);
  if (parts.length >= 2) {
    return parts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  }

  const single = parts[0] ?? options?.username ?? '';
  if (single && single.length <= 16 && /^[A-Za-z][a-z]+$/.test(single)) {
    return single.charAt(0).toUpperCase() + single.slice(1).toLowerCase();
  }

  return '';
}

function buildEmailHtml({
  title,
  greeting,
  bodyHtml,
  actionUrl,
  actionLabel,
  footerNote,
}: {
  title: string;
  greeting: string;
  bodyHtml: string;
  actionUrl: string;
  actionLabel: string;
  footerNote: string;
}): string {
  const greetingLine = greeting ? `<h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:${c.onSurface};">Hi ${greeting},</h2>` : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${c.background};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${c.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:${c.surface};border:1px solid ${c.outlineVariant};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:linear-gradient(135deg,${c.surfaceHigh} 0%,${c.surface} 55%,${c.background} 100%);border-bottom:1px solid ${c.outlineVariant};">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:12px;">
                      <div style="width:40px;height:40px;border-radius:10px;background-color:${c.primary};text-align:center;line-height:40px;font-size:20px;">🧪</div>
                    </td>
                    <td style="vertical-align:middle;">
                      <p style="margin:0;font-size:18px;font-weight:700;color:${c.primary};">${BRAND_NAME}</p>
                      <p style="margin:2px 0 0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${c.onSurfaceVariant};">${BRAND_TAGLINE}</p>
                    </td>
                  </tr>
                </table>
                <h1 style="margin:20px 0 0;font-size:24px;font-weight:800;color:${c.onSurface};line-height:1.3;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${greetingLine}
                ${bodyHtml}
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px auto;">
                  <tr>
                    <td align="center" style="border-radius:10px;background-color:${c.primary};">
                      <a href="${actionUrl}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:${c.onPrimary};text-decoration:none;">${actionLabel}</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 8px;font-size:13px;color:${c.onSurfaceVariant};">Or copy and paste this link in your browser:</p>
                <p style="margin:0;padding:12px 14px;background-color:${c.surfaceHigh};border:1px solid ${c.outlineVariant};border-radius:8px;font-size:12px;line-height:1.5;color:${c.primary};word-break:break-all;">${actionUrl}</p>
                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:${c.onSurfaceVariant};">${footerNote}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:${c.background};border-top:1px solid ${c.outlineVariant};text-align:center;">
                <p style="margin:0;font-size:12px;color:${c.onSurfaceVariant};">&copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
): Promise<void> {
  const verificationUrl = `${APP_URL}/auth/verify-email?token=${token}`;
  const greeting = formatGreetingName(email, { username });

  const mailOptions = {
    from: `"${BRAND_NAME}" <${EMAIL_FROM}>`,
    to: email,
    subject: `Verify your email — ${BRAND_NAME}`,
    html: buildEmailHtml({
      title: 'Verify your email',
      greeting,
      bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${c.onSurfaceVariant};">Thanks for signing up for <strong style="color:${c.onSurface};">${BRAND_NAME}</strong>. Please verify your email address to start your visual DSA learning journey.</p>`,
      actionUrl: verificationUrl,
      actionLabel: 'Verify Email Address',
      footerNote:
        'This link expires in 24 hours. If you did not create this account, you can safely ignore this email.',
    }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Sent to:', email);
  } catch (error: unknown) {
    const err = error as { code?: string; command?: string; message?: string };
    console.error('❌ Failed to send verification email');
    console.error('Error details:', {
      code: err.code,
      command: err.command,
      message: err.message,
    });

    if (err.code === 'ESOCKET' || err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('  1. Verify SMTP credentials in .env.local');
      console.log('  2. Check if port 465 is not blocked by firewall');
      console.log('  3. Verify your email password is correct');
      console.log('  4. Try using port 587 with TLS instead of SSL');
      console.log('  5. Consider using Gmail with App Password as alternative\n');
    }

    throw new Error('Failed to send verification email');
  }
}

export async function sendPasswordResetEmail(
  email: string,
  username: string,
  token: string,
  firstName?: string | null
): Promise<void> {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;
  const greeting = formatGreetingName(email, { username, firstName });

  const mailOptions = {
    from: `"${BRAND_NAME}" <${EMAIL_FROM}>`,
    to: email,
    subject: `Reset your password — ${BRAND_NAME}`,
    html: buildEmailHtml({
      title: 'Reset your password',
      greeting,
      bodyHtml: `
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${c.onSurfaceVariant};">We received a request to reset your ${BRAND_NAME} password. Click the button below to choose a new password.</p>
        <p style="margin:0;padding:14px 16px;background-color:${c.surfaceHigh};border-left:3px solid ${c.tertiary};border-radius:8px;font-size:13px;line-height:1.5;color:${c.onSurfaceVariant};">
          <strong style="color:${c.onSurface};">Security notice:</strong> This link expires in 1 hour. If you did not request a reset, ignore this email and your password will stay the same.
        </p>`,
      actionUrl: resetUrl,
      actionLabel: 'Reset Password',
      footerNote: 'For your security, never share this link with anyone.',
    }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Sent to:', email);
  } catch (error: unknown) {
    const err = error as { code?: string; command?: string; message?: string };
    console.error('❌ Failed to send password reset email');
    console.error('Error details:', {
      code: err.code,
      command: err.command,
      message: err.message,
    });

    if (err.code === 'ESOCKET' || err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT') {
      console.log('\n💡 Email configuration issue detected. Check SMTP settings.\n');
    }

    throw new Error('Failed to send password reset email');
  }
}
