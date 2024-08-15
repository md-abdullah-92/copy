import React, { useState } from 'react';
import { useRouter } from 'next/router';
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

const productsData = [
  {
    id: 1,
    name: 'Organic Apples',
    description: 'High-quality organic apples sourced from local farms.',
    image: '/assets/products/apple.jpg',
    rating: 4.5,
    owner: 'John Doe',
    price: 3.5,
    category: 'Fruits',
  },
  {
    id: 5,
    name: 'Free-Range Eggs',
    description: 'Farm-fresh eggs from free-range chickens.',
    image: '/assets/products/eggs.jpg',
    rating: 4.9,
    owner: 'Emily Davis',
    price: 2.5,
    category: 'Dairy',
  },
  {
    id: 6,
    name: 'Local Honey',
    description: 'Natural honey harvested from local beekeepers.',
    image: '/assets/products/honey.jpg',
    rating: 4.6,
    owner: 'Michael Lee',
    price: 6.0,
    category: 'Sweeteners',
  },
];

export default function BuyerDashboard() {
  const router = useRouter();

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

  const [cart, setCart] = useState<any[]>([]);

  const loggedInUser: User = {
    name: 'Jane Doe',
    role: 'Buyer',
    email: 'jane.doe@example.com',
  };

  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    alert(`${product.name} has been added to your cart.`);
  };

  const handleViewDetails = (id: number) => {
    router.push(`/product-details?id=${id}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSeeMore = () => {
    router.push('/BrowseProducts'); // Navigate to the page showing all products
  };

  // Move removeFromCart inside the component
  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    alert('Item removed from cart.');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  <li>
                    <a
                      href="#cart"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaShoppingCart className="mr-3" />
                      Cart
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="md:col-span-3 space-y-8">
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

              <section
                id="browse"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Browse Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsData.map((product) => (
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
                      <button
                        className="mt-4 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => handleViewDetails(product.id)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-8 w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                  onClick={handleSeeMore}
                >
                  See More
                </button>
              </section>

              <section
                id="orders"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Orders
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-700">
                        {order.product}
                      </h3>
                      <p className="text-gray-600 mt-2">Quantity: {order.quantity}</p>
                      <p className="text-gray-600 mt-2">Status: {order.status}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="favorites"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Favorites
                </h2>
                <div className="text-gray-600">No favorites added yet.</div>
              </section>

              <section
                id="payments"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Methods
                </h2>
                <div className="text-gray-600">No payment methods added yet.</div>
              </section>

              <section
                id="cart"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart</h2>
                {cart.length > 0 ? (
                  cart.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-4"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Your cart is empty.</p>
                )}
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
  );
}
