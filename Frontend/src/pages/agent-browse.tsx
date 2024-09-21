import React from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import Head from 'next/head';
import { useChat } from '@/hooks/useChat';
import useProducts, { Product } from '@/hooks/useProducts';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { useCart } from '@/hooks/useCart';

export default function BrowseProducts() {
  const router = useRouter();
 
  const { productsData, loading } = useProducts();
  const { searchTerm, selectedCategory, handleSearch, handleCategoryChange, filteredProducts } = useSearchFilter(productsData);
 

  

  return (
    <>
      <Head>
        <title>Products | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="bg-sky-100 min-h-screen flex flex-col">
        <Header />
        <ScrollAnimationWrapper>
          <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <img
                  src="/assets/logo.png"
                  alt="Agribazaar Logo"
                  width={80}
                  height={80}
                />
              </div>

              <div className="flex-grow flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-2xl mx-auto">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 border-r bg-gray-100 text-gray-700 rounded-l-full"
                >
                  <option value="">All Categories</option>
                  {/* Add options dynamically if needed */}
                </select>
                <input
                  type="text"
                  placeholder="Search for Products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border-none focus:outline-none rounded-r-full"
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.productname}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">{product.productname}</h2>
                    <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    <p className="text-gray-800 font-bold mt-2">${product.price}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                   
                   
                  </div>
                </div>
              ))}
            </div>
          </main>
        </ScrollAnimationWrapper>
        <Footer />
      </div>
    </>
  );
}
