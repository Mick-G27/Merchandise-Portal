'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Wallet, X, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  onSuccess: (paymentData: any) => void;
  onFailure: (error: string) => void;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  orderId, 
  onSuccess, 
  onFailure 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet }
  ];

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentStatus('processing');

    try {
      // Create payment order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: `order_${orderId}`,
          currency: 'INR'
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const { order } = await orderResponse.json();

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate payment success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        // Simulate payment verification
        const verifyResponse = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: order.id,
            razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            razorpay_signature: 'dummy_signature',
            orderId
          })
        });

        if (verifyResponse.ok) {
          setPaymentStatus('success');
          const paymentData = await verifyResponse.json();
          
          setTimeout(() => {
            onSuccess(paymentData);
            onClose();
          }, 2000);
        } else {
          throw new Error('Payment verification failed');
        }
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error: any) {
      setPaymentStatus('failed');
      setTimeout(() => {
        onFailure(error.message);
        setPaymentStatus('idle');
      }, 2000);
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Payment Status */}
            {paymentStatus !== 'idle' && (
              <div className="p-6 text-center">
                {paymentStatus === 'processing' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600">Processing your payment...</p>
                  </div>
                )}
                
                {paymentStatus === 'success' && (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Payment Successful!</h4>
                      <p className="text-gray-600">Your order has been confirmed.</p>
                    </div>
                  </div>
                )}
                
                {paymentStatus === 'failed' && (
                  <div className="space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Payment Failed</h4>
                      <p className="text-gray-600">Please try again or use a different payment method.</p>
                    </div>
                    <button
                      onClick={() => setPaymentStatus('idle')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Payment Form */}
            {paymentStatus === 'idle' && (
              <div className="p-6 space-y-6">
                {/* Amount */}
                <div className="text-center">
                  <p className="text-gray-600">Amount to pay</p>
                  <p className="text-3xl font-bold text-gray-900">₹{amount}</p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Select Payment Method</h4>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={24} className={selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'} />
                        <span className={`font-medium ${selectedMethod === method.id ? 'text-blue-600' : 'text-gray-700'}`}>
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Card Details Form */}
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          number: formatCardNumber(e.target.value) 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ 
                            ...prev, 
                            expiry: formatExpiry(e.target.value) 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ 
                            ...prev, 
                            cvv: e.target.value.replace(/\D/g, '') 
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          name: e.target.value 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* UPI Form */}
                {selectedMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Wallet Selection */}
                {selectedMethod === 'wallet' && (
                  <div className="space-y-3">
                    {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                      <button
                        key={wallet}
                        className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : `Pay ₹${amount}`}
                </button>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center">
                  Your payment information is secure and encrypted
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}