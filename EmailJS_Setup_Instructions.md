# EmailJS Setup Instructions

To enable email functionality for the client registration form, follow these steps:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free tier)
3. Verify your email address

## Step 2: Connect Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Client Registration from {{client_name}}

Hello Jamie,

You have received a new client registration from your website:

CLIENT DETAILS:
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Company: {{client_company}}
Position: {{client_position}}
Address: {{client_address}}

PROJECT INFORMATION:
Service Required: {{service_type}}
Project Scale: {{project_scale}}
Budget Range: {{budget_range}}
Timeline: {{timeline}}

PROJECT DESCRIPTION:
{{project_description}}

ADDITIONAL INFO:
How they heard about us: {{hear_about_us}}
Newsletter subscription: {{newsletter_subscription}}

Submitted on: {{submission_date}}

Best regards,
Precision Cabling & Automation Website
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key**

## Step 5: Update Website Code
1. Open `contact.html`
2. Find the line: `emailjs.init("YOUR_PUBLIC_KEY");`
3. Replace `YOUR_PUBLIC_KEY` with your actual public key
4. Find the line: `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)`
5. Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` with your actual IDs

## Example Configuration:
```javascript
// Initialize EmailJS
emailjs.init("user_abc123xyz");

// Send email
emailjs.send('service_gmail', 'template_client_reg', templateParams)
```

## Testing
1. Fill out the registration form on your website
2. Check that you receive the email at jamie@projectconsultants.org
3. Verify all form data is included correctly

## Backup Options
If EmailJS doesn't work, the form will:
1. Still save data to localStorage
2. Show an error message with instructions to contact directly
3. You can also add a "Send via Email Client" button that opens the user's email client

## Monthly Limits
- Free tier: 100 emails/month
- Paid plans available for higher volumes
- Monitor usage in EmailJS dashboard

## Security Notes
- Public key is safe to expose in client-side code
- Private key should never be used in frontend code
- EmailJS handles all email authentication securely
