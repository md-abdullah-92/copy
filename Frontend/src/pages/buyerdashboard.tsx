import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  FaUserCircle,
  FaShoppingCart,
  FaEdit,
  FaSignOutAlt,
  FaShoppingBag,
  FaChartLine,
  FaEnvelope,
  FaUsers,
} from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';
import PurchasedProducts from '@/components/PurchasedProducts';
import useUserAuthentication from '@/hooks/useUserAuthentication';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';

export default function BuyerDashboard() {
  const { loggedInUser, profile } = useUserAuthentication(); // Hook for authentication
  const { productsData, loading } = useProducts(); // Hook for fetching products

  const router = useRouter();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Buyer-Profile | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div className="min-h-screen bg-sky-200 py-8 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
                <div className="flex flex-col items-center">
                  {loggedInUser.avatarurl ? (
                    <img
                      src={loggedInUser.avatarurl}
                      alt={`${loggedInUser.name}'s Avatar`}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-7xl text-green-600" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">
                    {loggedInUser.name}
                  </h2>
                  <p className="text-sm text-gray-600">{loggedInUser.role}</p>
                  <p className="text-xs text-gray-500">{loggedInUser.email}</p>
                  <button
                    className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                    onClick={() => router.push('/update-profile')}
                  >
                    Manage Account
                  </button>
                  <button
                    className="mt-4 w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                    onClick={() => setShowSignOutConfirm(true)}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </div>
                <nav className="mt-12">
                  <ul className="space-y-6">
                    <li>
                      <a
                        href="#dashboard"
                        className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                      >
                        <FaChartLine className="mr-3" />
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#purchased"
                        className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                      >
                        <FaShoppingBag className="mr-3" />
                        Purchased Products
                      </a>
                    </li>
                    <li>
                      <Link href="/BrowseProducts" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                        <FaShoppingCart className="mr-3" />
                        Browse Products
                      </Link>
                    </li>
                    <li>
                      <a
                        href="cartpage"
                        className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                      >
                        <FaShoppingCart className="mr-3" />
                        Cart
                      </a>
                    </li>
                    <li>
                      <Link href="/chatbot-farmer" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                        <FaEdit className="mr-3" />
                        Bot Advisor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/chatpage"
                        className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                      >
                        <FaEnvelope className="mr-3" />
                        Messages
                      </Link>
                    </li>
                    <li>
                  <Link
                    href="/agent-list" 
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                  >
                    <FaUsers className="mr-3" />
                    Agent List
                  </Link>
                </li>
                  </ul>
                </nav>
              </div>

              <div className="md:col-span-3 space-y-8">
                <section
                  id="dashboard"
                  className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Dashboard Overview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-green-900">
                        Total Products
                      </h3>
                      <p className="text-3xl font-bold text-green-700 mt-3">
                        150
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-green-900">
                        Total Orders
                      </h3>
                      <p className="text-3xl font-bold text-green-700 mt-3">
                        320
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-green-900">
                        Messages
                      </h3>
                      <p className="text-3xl font-bold text-green-700 mt-3">
                        12
                      </p>
                    </div>
                  </div>
                </section>
                <section
                  id="purchased"
                  className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
                >
                  <PurchasedProducts buyeremail={loggedInUser.email} />
                </section>
              </div>
            </div>
          </div>

          {showSignOutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Are you sure you want to sign out?
                </h3>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSignOut}
                    className="py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                  >
                    Yes, Sign Out
                  </button>
                  <button
                    onClick={() => setShowSignOutConfirm(false)}
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}