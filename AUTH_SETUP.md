# Authentication System Setup Guide

This document explains the complete authentication system implemented in Noirly CodeLab.

## 📋 Features

✅ **User Registration** - Create new accounts with username, email, and password  
✅ **Email Verification** - Verify email addresses via token-based links  
✅ **User Login** - Secure login with email/username and password  
✅ **Forgot Password** - Request password reset via email  
✅ **Reset Password** - Set new password using reset token  
✅ **JWT Authentication** - Secure token-based session management  
✅ **MongoDB Integration** - User data stored in MongoDB Atlas  
✅ **Password Hashing** - Bcrypt encryption for secure password storage  

## 🗂️ File Structure

```
📁 app/
  📁 api/auth/
    📁 register/route.ts       # User registration endpoint
    📁 login/route.ts           # User login endpoint
    📁 logout/route.ts          # User logout endpoint
    📁 verify-email/route.ts    # Email verification endpoint
    📁 forgot-password/route.ts # Password reset request endpoint
    📁 reset-password/route.ts  # Password reset endpoint
  📁 auth/
    📁 register/page.tsx        # Registration UI
    📁 login/page.tsx           # Login UI
    📁 verify-email/page.tsx    # Email verification UI
    📁 forgot-password/page.tsx # Forgot password UI
    📁 reset-password/page.tsx  # Reset password UI

📁 lib/
  📄 mongodb.ts               # MongoDB connection utility
  📄 auth.ts                  # Authentication utilities (JWT, hashing)
  📄 email.ts                 # Email service (verification, reset)

📁 models/
  📄 User.ts                  # User schema and model

📄 .env.local               # Environment variables (DO NOT COMMIT)
```

## ⚙️ Configuration

### 1. Environment Variables

The `.env.local` file contains all necessary configuration. **Update these values:**

```env
# MongoDB - Already configured with your credentials
MONGODB_URI=mongodb+srv://aneeshpissay330:EWzIT58lGX9aOJmU@cluster0.pali5ep.mongodb.net/noirly-codelab?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret - CHANGE THIS to a random secure string in production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# App URL - Update when deploying
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration - Configure with your email service
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@noirly-codelab.com
```

### 2. Email Service Setup (Gmail Example)

To enable email verification and password reset:

1. **Use Gmail** (or any SMTP service):
   - Go to Google Account Settings
   - Enable 2-Factor Authentication
   - Generate an "App Password" for your application
   - Use this app password in `EMAIL_PASSWORD`

2. **Update `.env.local`**:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=noreply@noirly-codelab.com
   ```

3. **Alternative Email Services**:
   - **SendGrid**: Professional email service with API
   - **AWS SES**: Amazon Simple Email Service
   - **Mailgun**: Email automation service
   
   Update `lib/email.ts` transporter configuration accordingly.

### 3. MongoDB Database

Your database is already configured. The system will create a `users` collection automatically with the following schema:

```typescript
{
  username: string;
  email: string;
  password: string; // Bcrypt hashed
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt (salt rounds: 10)
2. **JWT Tokens**: 7-day expiration, HTTP-only cookies
3. **Token Expiry**: 
   - Email verification: 24 hours
   - Password reset: 1 hour
4. **Secure Cookies**: HTTP-only, SameSite, Secure (in production)
5. **Email Validation**: Regex pattern matching
6. **Password Requirements**: Minimum 6 characters

## 📝 User Flow

### Registration Flow

1. User visits `/auth/register`
2. Fills in username, email, and password
3. System:
   - Validates input
   - Checks for duplicate email/username
   - Hashes password
   - Creates user with `isVerified: false`
   - Generates verification token (24h expiry)
   - Sends verification email
4. User receives email with verification link
5. Clicks link → redirected to `/auth/verify-email?token=xxx`
6. System verifies token and marks user as verified
7. User can now log in

### Login Flow

1. User visits `/auth/login`
2. Enters email/username and password
3. System:
   - Finds user by email or username
   - Checks if email is verified
   - Compares password hash
   - Generates JWT token
   - Sets HTTP-only cookie
4. User redirected to `/learn-path`

### Password Reset Flow

1. User clicks "Forgot password?" on login page
2. Enters email address at `/auth/forgot-password`
3. System:
   - Finds user by email
   - Generates reset token (1h expiry)
   - Sends password reset email
4. User receives email with reset link
5. Clicks link → redirected to `/auth/reset-password?token=xxx`
6. Enters new password
7. System verifies token, updates password, clears reset token
8. User can now log in with new password

## 🎨 UI Pages

All authentication pages feature:
- Modern glass-morphism design
- Material Design 3 tokens
- Responsive layout
- Loading states
- Error handling
- Success feedback
- Smooth animations

### Available Routes

- `/auth/register` - New user registration
- `/auth/login` - User login
- `/auth/verify-email?token=xxx` - Email verification
- `/auth/forgot-password` - Request password reset
- `/auth/reset-password?token=xxx` - Reset password
- `/api/auth/logout` - Logout endpoint

## 🔧 API Endpoints

### POST `/api/auth/register`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response**: 201 Created + verification email sent

### POST `/api/auth/login`
```json
{
  "emailOrUsername": "john@example.com",
  "password": "password123"
}
```
**Response**: 200 OK + JWT cookie set

### POST `/api/auth/verify-email`
```json
{
  "token": "verification-token-from-email"
}
```
**Response**: 200 OK + user marked as verified

### POST `/api/auth/forgot-password`
```json
{
  "email": "john@example.com"
}
```
**Response**: 200 OK + reset email sent

### POST `/api/auth/reset-password`
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```
**Response**: 200 OK + password updated

### POST `/api/auth/logout`
**Response**: 200 OK + JWT cookie cleared

## 🧪 Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Registration
- Navigate to `http://localhost:3000/auth/register`
- Create a test account
- Check MongoDB for new user (unverified)
- Check email inbox for verification link

### 3. Test Email Verification
- Click verification link from email
- Should redirect to verify page with success
- Check MongoDB - user should now be verified

### 4. Test Login
- Navigate to `http://localhost:3000/auth/login`
- Login with verified credentials
- Should redirect to `/learn-path`

### 5. Test Password Reset
- Click "Forgot password?" on login
- Enter email and submit
- Check email for reset link
- Click link and set new password
- Login with new password

## 🚀 Production Deployment

Before deploying:

1. **Update Environment Variables**:
   ```env
   JWT_SECRET=<generate-strong-random-string>
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   EMAIL_USER=<production-email>
   EMAIL_PASSWORD=<production-password>
   ```

2. **Generate Secure JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Configure Production Email Service**:
   - Use professional service (SendGrid, AWS SES, etc.)
   - Update `lib/email.ts` with production credentials

4. **MongoDB Security**:
   - Use strong password
   - Configure IP whitelist
   - Enable network encryption

5. **Build and Deploy**:
   ```bash
   npm run build
   npm start
   ```

## 🛠️ Customization

### Change Token Expiry

Edit `lib/auth.ts`:
```typescript
// Email verification token (default: 24 hours)
const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

// Password reset token (default: 1 hour)
const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

// JWT token (default: 7 days)
generateToken(userId, '7d');
```

### Add Additional User Fields

Edit `models/User.ts`:
```typescript
firstName: { type: String },
lastName: { type: String },
profilePicture: { type: String },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
```

### Customize Email Templates

Edit `lib/email.ts` - modify the HTML in `sendVerificationEmail()` and `sendPasswordResetEmail()`.

## 📚 Dependencies

- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation/verification
- **nodemailer**: Email sending service

## ⚠️ Important Notes

1. **Never commit `.env.local`** - Contains sensitive credentials
2. **Change JWT_SECRET in production** - Use a strong random string
3. **Configure email service** - Verification won't work without it
4. **Test email flow** - Ensure emails are delivered before going live
5. **MongoDB security** - Use IP whitelist and strong passwords

## 🐛 Troubleshooting

### Email Not Sending
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`
- Verify Gmail app password is correct
- Check spam folder
- Review console logs for email errors

### MongoDB Connection Failed
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access (IP whitelist)
- Ensure cluster is running

### JWT Token Issues
- Clear browser cookies
- Verify `JWT_SECRET` is set
- Check token expiration time

### User Not Verified
- Check email inbox for verification link
- Verify token hasn't expired (24 hours)
- Check MongoDB - `isVerified` field should be `true`

## 📞 Support

For issues or questions:
1. Check MongoDB Atlas logs
2. Review browser console for errors
3. Check server logs in terminal
4. Verify environment variables are set correctly

---

**Built with ❤️ for Noirly CodeLab**
