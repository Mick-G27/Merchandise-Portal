import axios from 'axios';

const MSG91_API_KEY = process.env.MSG91_API_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'MERCHBX';

export const sendSMS = async (phoneNumber: string, message: string) => {
  if (!MSG91_API_KEY) {
    console.warn('MSG91 API key not configured');
    return;
  }

  try {
    const response = await axios.post('https://api.msg91.com/api/v5/flow/', {
      template_id: process.env.MSG91_TEMPLATE_ID,
      sender: MSG91_SENDER_ID,
      short_url: '1',
      mobiles: phoneNumber,
      var1: message
    }, {
      headers: {
        'authkey': MSG91_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
};

export const sendOrderStatusSMS = async (phoneNumber: string, orderNumber: string, status: string) => {
  const message = `Your MerchBox order ${orderNumber} is now ${status}. Track your order in the app.`;
  await sendSMS(phoneNumber, message);
};