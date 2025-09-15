// merchbox/app/products/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Our Premium Merchandise</h1>

        {loading && (
          <div className="py-10">
            <p className="text-xl text-blue-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="py-10 text-xl text-black">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="py-10">
            <p className="text-xl text-gray-700">No products found at the moment.</p>
            <p className="text-md text-gray-500">Please check back later!</p>
          </div>
        )}

        {/* This section will show only if there are no products to display */}
        {!loading && !error && products.length === 0 && (
          <div className="w-full">
            <h2 className="text-2xl font-semibold my-8 text-black">Product Display Placeholder</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-black h-64 rounded-lg shadow-md"></div>
              ))}
            </div>
          </div>
        )}

        {/* This section is for the actual products when they load */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left w-full">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href={`/products/${product._id}`} passHref>
                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  <Link href={`/products/${product._id}`} className="hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>

                {product.category && (
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                )}

                <p className="text-2xl font-bold text-blue-600 mb-3">${product.price.toFixed(2)}</p>

                <Link href={`/products/${product._id}`} passHref>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;