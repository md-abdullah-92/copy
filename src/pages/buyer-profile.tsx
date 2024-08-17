import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
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

export default function BuyerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null); // State to store logged-in user data
  const router = useRouter();

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      try {
        const res = await axios.get('/api/profiles?role=buyer', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setProfile(res.data);
        setLoggedInUser({
          name: res.data.name,
          role: res.data.role,
          email: res.data.email,
        });
      } catch (err) {
        console.error('Error fetching buyer profile:', err);
        router.push('/login'); // Redirect to login if user is not authenticated
      }
    };

    fetchBuyerProfile();
  }, [router]);

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
  const productsData = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      image: '/path/to/image1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      image: '/path/to/image2.jpg',
    },
    // Add more products as needed
  ];
  

  const [cart, setCart] = useState<any[]>([]);
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
                {loggedInUser && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">
                      {loggedInUser.name}
                    </h2>
                    <p className="text-sm text-gray-600">{loggedInUser.role}</p>
                    <p className="text-xs text-gray-500">{loggedInUser.email}</p>
                  </>
                )}
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
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                    onClick={handleSeeMore}
                  >
                    See More
                  </button>
                </div>
              </section>

              <section
                id="orders"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      <button
                        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="cart"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-700">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <button
                        className="mt-4 w-full py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                onClick={handleSignOut}
              >
                Yes, Sign Out
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                onClick={() => setShowSignOutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
