// merchbox/app/cart/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react'; // Assuming you use lucide-react for icons
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CartPage = () => {
  // This is where you would typically fetch cart data, but for now, we'll assume it's empty.
  const isCartEmpty = true;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        {isCartEmpty ? (
          <div className="max-w-md mx-auto p-8">
            <ShoppingBag size={64} className="text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-6">Looks like you haven't added anything to your cart yet. Browse our products to find something you love!</p>
            <Link href="/products" passHref>
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {/* This is where you would display the items in the cart */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;