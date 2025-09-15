'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'general', label: 'General', icon: '❓' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'shipping', label: 'Shipping', icon: '🚚' },
    { id: 'returns', label: 'Returns', icon: '↩️' },
    { id: 'groups', label: 'Group Orders', icon: '👥' },
  ];

  const faqs = {
    general: [
      {
        id: 'g1',
        question: 'What is MerchBox?',
        answer: 'MerchBox is a comprehensive merchandise portal that provides premium corporate gifts, promotional items, and custom merchandise for businesses, departments, and special events. We offer both individual and group ordering capabilities.'
      },
      {
        id: 'g2',
        question: 'How do I create an account?',
        answer: 'Click on the "Register" button in the top-right corner, fill in your details including name, email, and department information. You\'ll receive a confirmation email to verify your account.'
      },
      {
        id: 'g3',
        question: 'What types of products do you offer?',
        answer: 'We offer a wide range of merchandise including apparel, accessories, electronics, stationery, drinkware, corporate gifts, and custom branded items. All products are sourced from trusted suppliers and meet quality standards.'
      },
      {
        id: 'g4',
        question: 'Can I customize products with my company logo?',
        answer: 'Yes! Many of our products support customization with your company logo, brand colors, and messaging. Look for the "Customizable" tag on product pages or contact our team for custom requirements.'
      }
    ],
    orders: [
      {
        id: 'o1',
        question: 'How do I place an order?',
        answer: 'Browse our product catalog, add items to your cart, review your order, provide shipping details, and complete payment. You\'ll receive an order confirmation email with tracking details.'
      },
      {
        id: 'o2',
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 1 hour of placement. After this window, please contact our support team. Once an order is in processing, modifications may not be possible.'
      },
      {
        id: 'o3',
        question: 'How do I track my order?',
        answer: 'Log into your dashboard and go to "My Orders" to view real-time tracking information. You\'ll also receive SMS and email updates on status changes including packed, shipped, and delivered notifications.'
      },
      {
        id: 'o4',
        question: 'What is the typical order processing time?',
        answer: 'Standard orders are processed within 2-3 business days. Custom or bulk orders may take 5-7 business days. You\'ll receive estimated delivery dates at checkout.'
      }
    ],
    payments: [
      {
        id: 'p1',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay integration. All transactions are encrypted and PCI DSS compliant.'
      },
      {
        id: 'p2',
        question: 'Is my payment information secure?',
        answer: 'Absolutely! We use industry-standard encryption and never store your payment details. All transactions are processed through Razorpay\'s secure gateway with multi-layer security protocols.'
      },
      {
        id: 'p3',
        question: 'What happens if my payment fails?',
        answer: 'If payment fails, you can retry immediately or within 24 hours. We also support multiple payment attempts and will send reminder notifications. Your order is held during the retry period.'
      },
      {
        id: 'p4',
        question: 'Do you offer payment plans for large orders?',
        answer: 'Yes, for bulk orders above ₹50,000, we offer flexible payment terms including partial payments and invoicing for corporate clients. Contact our sales team for details.'
      }
    ],
    shipping: [
      {
        id: 's1',
        question: 'What are your shipping options?',
        answer: 'We offer standard delivery (3-5 business days), express delivery (1-2 business days), and same-day delivery in select cities. Shipping costs are calculated based on location and order value.'
      },
      {
        id: 's2',
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. We cover all major cities and towns through our logistics partners. International shipping will be available soon.'
      },
      {
        id: 's3',
        question: 'Is free shipping available?',
        answer: 'Yes! Free standard shipping on orders above ₹2,000. Express delivery charges may apply based on location and urgency requirements.'
      },
      {
        id: 's4',
        question: 'Can I change my delivery address?',
        answer: 'Address changes are possible before the order is shipped. Contact our support team or update through your dashboard. Once shipped, address modifications are not possible.'
      }
    ],
    returns: [
      {
        id: 'r1',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for non-customized items in original condition. Custom/personalized products are non-returnable unless there\'s a manufacturing defect.'
      },
      {
        id: 'r2',
        question: 'How do I initiate a return?',
        answer: 'Go to "My Orders" in your dashboard, select the item to return, choose the return reason, and schedule a pickup. You\'ll receive a return confirmation and tracking details.'
      },
      {
        id: 'r3',
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 3-5 business days after we receive and verify the returned item. The amount will be credited to your original payment method.'
      },
      {
        id: 'r4',
        question: 'Who pays for return shipping?',
        answer: 'Return shipping is free if the return is due to our error (wrong/defective item). For other returns, standard return shipping charges apply as per our policy.'
      }
    ],
    groups: [
      {
        id: 'gr1',
        question: 'How do group orders work?',
        answer: 'Group orders allow departments or teams to order together. A group leader creates the order, members contribute their share, and products are delivered to a central location or individual addresses.'
      },
      {
        id: 'gr2',
        question: 'Who can create a group order?',
        answer: 'Department heads, team leaders, or any user with appropriate permissions can create group orders. The group leader manages member invitations, contributions, and order finalization.'
      },
      {
        id: 'gr3',
        question: 'How do member contributions work?',
        answer: 'Members receive email/SMS invitations to contribute their share. They can pay their portion independently, and the order is finalized once all contributions are collected or the deadline is reached.'
      },
      {
        id: 'gr4',
        question: 'Can I leave a group order after joining?',
        answer: 'Yes, you can leave a group order before making payment. After payment, contact the group leader or our support team for assistance with refunds.'
      }
    ]
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about MerchBox. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openItems.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you 24/7. Get in touch through any of these channels.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <a
                  href="mailto:support@merchbox.com"
                  className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-200"
                >
                  <Mail className="w-6 h-6" />
                  <span className="font-medium">Email Support</span>
                </a>
                
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-200"
                >
                  <Phone className="w-6 h-6" />
                  <span className="font-medium">Call Us</span>
                </a>
                
                <button className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-200">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-medium">Live Chat</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}