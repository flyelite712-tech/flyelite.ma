# Email Configuration Setup Guide

This guide will help you configure the email system for Fly Elite using Zoho Mail and Nodemailer.

## Prerequisites

- A Zoho Mail account
- Access to your Zoho account settings

## Step 1: Generate Zoho App Password

1. Log in to your Zoho Mail account
2. Go to **Settings** → **Security** → **App Passwords**
3. Click **Generate New Password**
4. Give it a name (e.g., "Fly Elite Website")
5. Copy the generated password (you'll need this for the `.env.local` file)

## Step 2: Create Environment File

1. In the root directory of your project, create a file named `.env.local`
2. Copy the contents from `.env.example` and fill in your details:

```env
# Zoho Email Configuration for Nodemailer
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-app-password-from-step-1

# Email Settings
EMAIL_FROM=your-email@yourdomain.com
EMAIL_TO=your-email@yourdomain.com
BRAND_NAME=Fly Elite
```

### Configuration Details:

- **SMTP_HOST**: `smtp.zoho.com` (Zoho's SMTP server)
- **SMTP_PORT**: `465` (SSL port for secure connection)
- **SMTP_SECURE**: `true` (enables SSL/TLS)
- **SMTP_USER**: Your full Zoho email address
- **SMTP_PASS**: The app password you generated in Step 1
- **EMAIL_FROM**: The email address that will appear as the sender
- **EMAIL_TO**: Your email address where you'll receive notifications
- **BRAND_NAME**: Your company name (default: "Fly Elite")

## Step 3: Test the Configuration

After setting up your `.env.local` file:

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test each form:
   - **Homepage**: Fill out the flight search form and submit a quote request
   - **Offers Page**: Click on an offer and submit a booking
   - **Contact Page**: 
     - Use the "Message" tab to send a contact message
     - Use the "Réservation" tab to request a flight quote

## Email Flow

### Quote Request (Homepage & Contact Page - Reservation Tab)
When a user submits a quote request:
1. **Client receives**: Confirmation email with flight details
2. **You receive**: Detailed quote request with all information and client contact details

### Booking (Offers Page)
When a user books an offer:
1. **Client receives**: Booking confirmation with flight details, price, and aircraft information
2. **You receive**: Complete booking details with client information and pricing

### Contact Message (Contact Page - Message Tab)
When a user sends a contact message:
1. **Client receives**: Acknowledgment that their message was received
2. **You receive**: The full message with client contact details

## Troubleshooting

### Common Issues:

1. **"Authentication failed" error**
   - Verify your email and app password are correct
   - Make sure you're using an app password, not your regular password
   - Check that your Zoho account has SMTP access enabled

2. **"Connection timeout" error**
   - Verify SMTP_HOST is `smtp.zoho.com`
   - Check SMTP_PORT is `465`
   - Ensure SMTP_SECURE is `true`

3. **Emails not being received**
   - Check your spam/junk folder
   - Verify EMAIL_TO is set correctly
   - Check Zoho's sending limits (free accounts have daily limits)

4. **"Invalid sender" error**
   - Ensure EMAIL_FROM matches your SMTP_USER
   - Verify your domain is properly configured in Zoho

## Email Templates

All email templates are located in `/lib/email.ts`. Each template includes:
- Professional HTML formatting
- Brand colors and styling
- All relevant flight/booking information
- Client-friendly confirmation messages
- Internal notifications with complete data

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Use app passwords instead of your main Zoho password
- Regularly rotate your app passwords for security
- Keep your SMTP credentials confidential

## Support

If you encounter issues:
1. Check Zoho's SMTP documentation: https://www.zoho.com/mail/help/zoho-smtp.html
2. Verify your Zoho account status and sending limits
3. Review the server logs for detailed error messages

## Features

✅ **Homepage**: Flight search with quote request form
✅ **Offers Page**: Direct booking with confirmation emails
✅ **Contact Page**: 
  - Contact message form
  - Reservation/quote request form (via tabs)
✅ **Dual Email System**: Confirmation to client + notification to you
✅ **Professional Templates**: Branded HTML emails with all details
✅ **Data Validation**: Form validation before sending
✅ **Error Handling**: User-friendly error messages
