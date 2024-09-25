import { useProfile } from '@/hooks/useProfile'; // Adjust this path based on your project structure
import { useOwnerProducts } from '@/hooks/useOwnerProducts';
import { useSignOut } from '@/hooks/useSignOut';// Assuming you have a hook for handling the cart
import Layout from '@/components/Layout/Layout';
import ManageProduct from '@/components/Farmercomponents/ManageProducts';
import AddProduct from '@/components/Farmercomponents/Addproducts';
import {useOrders} from '@/hooks/useOrders';
import { useRouter } from 'next/router';
import {useChats} from '@/hooks/useChats';
import { FaUserCircle, FaSignOutAlt, FaBox, FaCartPlus, FaChartLine, FaEnvelope,FaTractor,FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

interface Orders {
  id: number;
  name: string;
  image: string;
  buyername: string;
  soldquantity: string;
  soldprice: string;
  soldtime: string;
  deviverybyaddress: string;
  deliverystatus: string;
  buyeremail: string;
}


export default function DashboardProfile() {
  const { profiles, loggedInUser } = useProfile();
  const { products, loading, error } = useOwnerProducts();
  const { showSignOutConfirm, setShowSignOutConfirm, handleSignOut } = useSignOut();
  const { orders, deliveredOrders } = useOrders();
  const { chats } = useChats(loggedInUser.id as string);
 // const { cartItems, handleAddToCart } = useCart(); // Hook to manage cart items
  const router = useRouter();

  if (loading) return <p>Loading products...</p>;
  

  return (
    <>
    <Head>
      <title>Farmer-Dashboard | AgriBazaar</title>
      <link rel="icon" href="/assets/logo.png" />
    </Head>
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
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
                  {loggedInUser.name || 'John Doe'}
                </h2>
                <p className="text-sm text-gray-600">{loggedInUser.role || 'Farmer'}</p>

                <button
                  className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                  onClick={() => router.push('/update-profile')}
                >
                  Edit Profile
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
                      href="#products"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaBox className="mr-3" />
                      Manage Products
                    </a>
                  </li>
                  <li>
                    <Link href="/orders" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <FaTractor className="mr-3" />
                      Orders
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#addproduct"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaCartPlus className="mr-3" />
                      Add Product
                    </a>
                  </li>
                  {/* Bot Advisor */}
                  <li>
                    <Link
                      href="/chatbot-farmer"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaEnvelope className="mr-3" />
                      Bot Advisor
                    </Link>
                  </li>
                  {/* Messages */}
                  <li>
                    <Link
                    href={`/chatpage?id=${loggedInUser.id}`}

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

            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              {/* Dashboard Overview */}
              <section
                id="dashboard"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-green-900">Total Products</h3>
                    <p className="text-3xl font-bold text-green-700 mt-3">{products.length}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-green-900">Total Orders</h3>
                    <p className="text-3xl font-bold text-green-700 mt-3">{orders.length}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-green-900">Delivered Products</h3>
                  <p className="text-3xl font-bold text-green-700 mt-3">{deliveredOrders.length}</p>
                  </div>
                </div>
              </section>

              {/* Manage Products Section */}
              <section
                id="products"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-6">
                  <ManageProduct />
                </div>
              </section>

              {/* Add Product Section */}
              <section
                id="addproduct"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105">
                <div className="flex justify-between items-center mb-6">
                  <AddProduct />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sign Out Confirmation Modal */}
        {showSignOutConfirm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Confirm Sign Out</h3>
              <p className="mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-full mr-4 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Sign Out
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
