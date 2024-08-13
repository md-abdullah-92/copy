import React, { useState } from 'react';
import {
  FaUserCircle,
  FaShoppingCart,
  FaBoxOpen,
  FaCreditCard,
  FaSignOutAlt,
  FaHeart,
  FaShoppingBag,
} from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';

interface User {
  name: string;
  role: string;
  email: string;
}

export default function BuyerDashboard() {
  // State to manage the purchased products and orders
  const [purchasedProducts, setPurchasedProducts] = useState([
    {
      id: 1,
      name: 'Organic Apples',
      description: 'High-quality organic apples sourced from local farms.',
      image: '/path/to/image.jpg',
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      description: 'Crunchy and fresh carrots.',
      image: '/path/to/image2.jpg',
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      product: 'Organic Apples',
      quantity: 10,
      status: 'Delivered',
    },
    {
      id: 2,
      product: 'Fresh Carrots',
      quantity: 5,
      status: 'Shipped',
    },
  ]);

  // Simulating a logged-in user
  const loggedInUser: User = {
    name: 'Jane Doe',
    role: 'Buyer',
    email: 'jane.doe@example.com',
  };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center">
                <FaUserCircle className="text-7xl text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {loggedInUser.name}
                </h2>
                <p className="text-sm text-gray-600">{loggedInUser.role}</p>
                <p className="text-xs text-gray-500">{loggedInUser.email}</p>
                <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                  Manage Account
                </button>
                <button className="mt-4 w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center">
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
              <nav className="mt-12">
                <ul className="space-y-6">
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
                    <a
                      href="#browse"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaShoppingCart className="mr-3" />
                      Browse Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#orders"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaBoxOpen className="mr-3" />
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#favorites"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaHeart className="mr-3" />
                      Favorites
                    </a>
                  </li>
                  <li>
                    <a
                      href="#payments"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaCreditCard className="mr-3" />
                      Payment Methods
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              {/* Purchased Products Section */}
              <section
                id="purchased"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Purchased Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {purchasedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 mt-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Browse Products Section */}
              <section
                id="browse"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Browse Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Example product cards can be added here */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                    <img
                      src="/path/to/sample-product.jpg"
                      alt="Sample Product"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-700 mt-4">
                      Sample Product
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Description of the sample product.
                    </p>
                    <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </section>

              {/* Orders Section */}
              <section
                id="orders"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                <div className="grid grid-cols-1 gap-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-700">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {order.quantity}kg of {order.product} - Status:{' '}
                        {order.status}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Favorites Section */}
              <section
                id="favorites"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Favorites
                </h2>
                {/* List of favorite products can be added here */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-gray-600">
                    You haven't added any products to your favorites yet.
                  </p>
                </div>
              </section>

              {/* Payment Methods Section */}
              <section
                id="payments"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Methods
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-gray-600">No payment methods added yet.</p>
                  <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                    Add Payment Method
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
