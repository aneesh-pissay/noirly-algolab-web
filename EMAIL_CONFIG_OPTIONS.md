# Email Configuration Options for Noirly CodeLab

This file contains different SMTP configurations you can use in `lib/email.ts`.

## Current Setup (GoDaddy)

```typescript
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
});
```

**If you're getting ECONNRESET errors, try:**

### Option 1: Use Port 587 (TLS) Instead

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
});
```

### Option 2: Gmail (Most Reliable)

**Setup:**
1. Enable 2-Factor Authentication in your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an "App Password" for "Mail"
4. Use the 16-character password (no spaces)

**Update .env.local:**
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-gmail@gmail.com
```

**Update lib/email.ts:**
```typescript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
```

Or with explicit settings:
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
```

### Option 3: Outlook/Hotmail

**Update .env.local:**
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=your-email@outlook.com
```

**Update lib/email.ts:**
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});
```

### Option 4: SendGrid (Professional - Recommended for Production)

**Setup:**
1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create an API key
3. Install: `npm install @sendgrid/mail`

**Update .env.local:**
```env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@your-domain.com
```

**Create new file lib/email-sendgrid.ts:**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM!,
    subject: 'Verify Your Email - Noirly CodeLab',
    html: `Your HTML template here`,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Verification email sent to:', email);
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    throw new Error('Failed to send verification email');
  }
}
```

### Option 5: AWS SES (Amazon Simple Email Service)

**Setup:**
1. Set up AWS SES and verify your domain
2. Install: `npm install @aws-sdk/client-ses`
3. Get AWS credentials

**Update .env.local:**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
EMAIL_FROM=noreply@your-verified-domain.com
```

### Option 6: Disable Email Temporarily (Testing Only)

If you want to test without emails, modify the email functions:

```typescript
export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
): Promise<void> {
  const verificationUrl = `${APP_URL}/auth/verify-email?token=${token}`;
  
  console.log('📧 [DEV MODE] Verification email would be sent to:', email);
  console.log('🔗 Verification URL:', verificationUrl);
  console.log('💡 Copy this URL to verify manually');
  
  // Skip actual email sending in development
  return Promise.resolve();
}
```

## Troubleshooting

### ECONNRESET / ESOCKET Errors

1. **Check Firewall**: Ensure ports 465/587 are not blocked
2. **Verify Credentials**: Double-check email and password in `.env.local`
3. **Test Connection**: Run this in your terminal:
   ```bash
   npm install -g smtp-connection-tester
   smtp-connection-tester -h smtpout.secureserver.net -p 465 -s true -u contact@aneesh-pissay.in -w your-password
   ```
4. **Check Email Provider Logs**: GoDaddy/Gmail might have security logs
5. **Try Different Port**: Switch between 465 (SSL) and 587 (TLS)

### Authentication Failed

- Verify you're using the correct password
- For Gmail: Must use App Password, not regular password
- For GoDaddy: Regular email password should work
- Check if 2FA is required

### Connection Timeout

- Increase timeout values in transporter config
- Check your internet connection
- Verify SMTP server is accessible from your location

### Certificate Errors

Add to transporter config:
```typescript
tls: {
  rejectUnauthorized: false, // Accept self-signed certificates
  minVersion: 'TLSv1.2',
}
```

## Recommended Solution

**For Development:** Use Gmail with App Password (most reliable)
**For Production:** Use SendGrid or AWS SES (professional, scalable)

## Quick Switch to Gmail

1. Update `.env.local`:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password-from-google
EMAIL_FROM=your-gmail@gmail.com
```

2. Update `lib/email.ts` transporter:
```typescript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
```

3. Restart dev server: `npm run dev`

This should resolve most connection issues!
