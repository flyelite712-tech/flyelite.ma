# Quick Start - Email Configuration

## 🚀 Fast Setup (5 minutes)

### 1. Get Zoho App Password
- Login to Zoho Mail
- Settings → Security → App Passwords
- Generate new password
- Copy it!

### 2. Create `.env.local` file in project root

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=paste-your-app-password-here
EMAIL_FROM=your-email@yourdomain.com
EMAIL_TO=your-email@yourdomain.com
BRAND_NAME=Fly Elite
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Test Forms
- ✅ Homepage → Search form → Quote request
- ✅ Offers page → Click offer → Book now
- ✅ Contact page → Message tab → Send message
- ✅ Contact page → Réservation tab → Request quote

## 📧 What Happens

**Every form submission sends 2 emails:**
1. **To Client**: Professional confirmation
2. **To You**: Complete details with client info

## 🎯 Forms Available

| Page | Form Type | Client Email | Your Email |
|------|-----------|--------------|------------|
| Homepage | Quote Request | ✅ Confirmation | ✅ Full details |
| Offers Page | Booking | ✅ Booking confirmation | ✅ Booking details + price |
| Contact Page (Message) | Contact | ✅ Acknowledgment | ✅ Full message |
| Contact Page (Réservation) | Quote Request | ✅ Confirmation | ✅ Full details |

## ⚡ Important Notes

- Use **app password**, not your regular password
- EMAIL_FROM must match SMTP_USER
- Check spam folder if emails don't arrive
- `.env.local` is already gitignored (secure)

## 🔧 Need Help?

See `EMAIL_SETUP.md` for detailed troubleshooting guide.
