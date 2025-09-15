import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@merchbox.com',
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendOrderConfirmation = async (userEmail: string, orderNumber: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">Order Confirmation - MerchBox</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p>We'll keep you updated on the status of your order.</p>
      <p>Best regards,<br>MerchBox Team</p>
    </div>
  `;
  
  await sendEmail(userEmail, `Order Confirmation - ${orderNumber}`, html);
};

export const sendPaymentReminder = async (userEmail: string, orderNumber: string, amount: number) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #F97316;">Payment Reminder - MerchBox</h2>
      <p>This is a reminder that your payment for order ${orderNumber} is still pending.</p>
      <p><strong>Amount Due:</strong> ₹${amount}</p>
      <p>Please complete your payment to avoid order cancellation.</p>
      <p>Best regards,<br>MerchBox Team</p>
    </div>
  `;
  
  await sendEmail(userEmail, `Payment Reminder - ${orderNumber}`, html);
};