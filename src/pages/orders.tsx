import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout/Layout';
import { FaSearch, FaEye, FaTrash, FaUser, FaBox } from 'react-icons/fa';

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
  buyerName: string;
  buyeremail: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const selleremail = localStorage.getItem('email');
      console.log('Seller Email:', selleremail);

      try {
        setLoading(true);
        const response = await axios.get('/api/orders', {
          params: { selleremail },
        });
        console.log('API Response:', response.data);

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

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to delete order. Please try again.');
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm === '' || order.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.deliverystatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-indigo-900">
                Order Management
              </h2>
            
            </div>

            {/* Search and Filter Controls */}
            <div className="flex mb-6 justify-between items-center">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Search Orders by Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center">
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Orders</option>
                  <option value="Packaging Done">Packaging Done</option>
                  <option value="Waiting for Pickup">Waiting for Pickup</option>
                  <option value="Delivered">Delivered</option>
                  <option value="On the Road">On the Road</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            {loading ? (
              <p className="text-center text-indigo-700">Loading orders, please wait...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md p-6 flex justify-between items-center transform transition duration-500 hover:scale-105"
                  >
                    <div className="flex space-x-4 items-center">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-indigo-900">
                          {order.name}
                        </h3>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Sold Quantity:</span>{' '}
                          <i>{order.soldquantity}</i>,
                          <span className="font-bold ml-2">Total Price:</span>{' '}
                          <i>${order.soldprice}</i>
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Buyer:</span>{' '}
                          <i>{order.buyername}</i>{' '}
                          (<a
                            href={`mailto:${order.buyeremail}`}
                            className="text-indigo-600 underline"
                          >
                            {order.buyeremail}
                          </a>
                          ),{' '}
                          <span className="font-bold ml-4">Status:</span>
                          <span
                            className={`font-bold italic ${
                              order.deliverystatus === 'Delivered'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {order.deliverystatus}
                          </span>
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Sold On:</span>{' '}
                          <i>{order.soldtime}</i>,
                          <span className="font-bold ml-4">
                              Delivery Address:
                          </span>{' '}
                          <i>{order.deviverybyaddress}</i>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                    <button
                      onClick={() => router.push(`/update-order-status?orderId=${order.id}&status=${order.deliverystatus}`)}
                      className="bg-transparent text-blue-500 px-5 py-3 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      Update Status
                    </button>
                  </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-700">
                No orders found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
