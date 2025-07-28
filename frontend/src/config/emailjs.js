// EmailJS Configuration
// To set this up:
// 1. Go to https://www.emailjs.com/
// 2. Sign up and create an account
// 3. Add an email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below

export const emailjsConfig = {
  serviceID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_3xxvqsg',
  templateID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_33l4dn9',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'KydqMwoMdwSfGcaV4'
};

// Example template variables you can use in your EmailJS template:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Your email (pranavpriyadarshi903@gmail.com)
