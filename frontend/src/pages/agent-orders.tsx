import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout/Layout';
import { FaSearch, FaUser, FaShoppingBag, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Head from 'next/head';

interface Order {
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const router = useRouter();
  const {email} = router.query;

  useEffect(() => {
    const fetchOrders = async () => {
      const selleremail = localStorage.getItem('email')||email;

      try {
        setLoading(true);
        const response = await axios.get('/api/orders', {
          params: { selleremail },
        });

        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm === '' || order.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.deliverystatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
    <Head>
      <title>ProductList | AgriBazaar</title>
      <link rel="icon" href="/assets/logo.png" />
    </Head>
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-sky-900">Order Management</h2>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex mb-6 justify-between items-center">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Search Orders by Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center">
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Pending</option>
                  <option value="Packaging Done">Packaging Done</option>
                  <option value="Waiting for Pickup">Waiting for Pickup</option>
                  <option value="On the Road">On the Road</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            {loading ? (
              <p className="text-center text-sky-700">Loading orders, please wait...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-green-100 border-2 border-green-200 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 p-6 transform hover:-translate-y-2 relative"
                  >
                    {/* Decorative Border */}
                    <div className="absolute inset-0 -m-1 rounded-lg bg-gradient-to-r from-green-400 to-green-200 opacity-20 pointer-events-none"></div>
                    <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-xl font-semibold text-green-900">{order.name}</h3>
                    <p className="text-sm text-gray-500">
                      <FaShoppingBag className="inline-block mr-1 text-green-400" />
                      <span className="font-bold">Quantity:</span> {order.soldquantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaUser className="inline-block mr-1 text-green-400" />
                      <span className="font-bold">Buyer:</span> {order.buyername}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaMapMarkerAlt className="inline-block mr-1 text-green-400" />
                      <span className="font-bold">Address:</span> {order.deviverybyaddress}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaCalendarAlt className="inline-block mr-1 text-green-400" />
                      <span className="font-bold">Sold On:</span> {order.soldtime}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold">Status:</span>{' '}
                      <span
                        className={`font-bold italic ${
                          order.deliverystatus === 'Delivered'
                            ? 'text-green-600'
                            : order.deliverystatus === 'Pending'
                            ? 'text-yellow-500'
                            : 'text-red-600'
                        }`}
                      >
                        {order.deliverystatus}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-center items-center ml-auto">
                    <button
                      className="bg-transparent text-blue-500 px-5 py-2.5 border border-green-500 rounded-md text-xs hover:bg-green-500 hover:text-white transition-colors duration-300"
                      onClick={() => router.push(`/update-order-status?orderId=${order.id}&status=${order.deliverystatus}`)}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
                </div>
                </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-700">No orders found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
}
