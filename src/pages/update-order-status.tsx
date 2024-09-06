import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout/Layout';

const UpdateOrderStatus: React.FC = () => {
  const router = useRouter();
  const { orderId, status } = router.query; // Fetch orderId and status from query parameters

  const [order, setOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>(status as string);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      setOrder({ id: orderId, deliverystatus: status });
      setLoading(false);
    }
  }, [orderId, status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/orders/${orderId}`, {
        deliverystatus: newStatus,
      });
      router.push('/orders'); // Navigate back to the orders page after update
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            {loading ? (
              <p className="text-center text-indigo-700">Loading order details...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-indigo-900 mb-8">
                  Update Order Status
                </h2>
                <p className="mb-4 text-lg">
                  <strong>Order ID:</strong> {orderId}
                </p>
                <p className="mb-4 text-lg">
                  <strong>Current Status:</strong> {order?.deliverystatus}
                </p>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
                    Select New Status
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Update Status
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateOrderStatus;
