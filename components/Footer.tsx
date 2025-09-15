import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MerchBox</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for premium merchandise and corporate gifts. 
              Quality products, seamless experience, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Products
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <nav className="space-y-2">
              <Link href="/products?category=apparel" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Apparel
              </Link>
              <Link href="/products?category=accessories" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Accessories
              </Link>
              <Link href="/products?category=electronics" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Electronics
              </Link>
              <Link href="/products?category=stationery" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Stationery
              </Link>
              <Link href="/products?category=drinkware" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Drinkware
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>123 Business District</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <p className="text-sm text-gray-300">+91 98765 43210</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <p className="text-sm text-gray-300">support@merchbox.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 MerchBox. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}