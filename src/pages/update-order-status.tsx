import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout/Layout';

const UpdateOrderStatus: React.FC = () => {
  const router = useRouter();
  const { orderId, status } = router.query;

  const [order, setOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>(status as string);
  const [otp, setOtp] = useState<string>('');
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      setOrder({ id: orderId, deliverystatus: status });
      setLoading(false);
    }
  }, [orderId, status]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setNewStatus(selectedStatus);

    if (selectedStatus === 'Delivered') {
      // Trigger OTP sending to buyer's email
      try {
        await axios.post(`/api/orders/${orderId}/send-otp`);
        setOtpRequired(true); // Show OTP input when status is "Delivered"
      } catch (err) {
        console.error('Error sending OTP:', err);
        setError('Failed to send OTP. Please try again.');
      }
    } else {
      setOtpRequired(false); // Hide OTP input for other statuses
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async () => {
    if (newStatus === 'Delivered' && otpRequired && !otp) {
      setError('Please enter the OTP sent to the buyer.');
      return;
    }

    try {
      // Verify OTP if status is "Delivered"
      if (newStatus === 'Delivered') {
        await axios.post(`/api/orders/${orderId}/verify-otp`, { otp });
      }

      // Update the order status
      await axios.put(`/api/orders/${orderId}`, {
        deliverystatus: newStatus,
      });

      router.push('/orders');
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update the order status. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-sky-300 py-10 pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-10 transition-transform transform hover:scale-105 duration-300">
            {loading ? (
              <p className="text-center text-green-700">Loading order details...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-green-900 mb-8">
                  Update Order Status
                </h2>
                <p className="mb-4 text-lg">
                  <strong>Order ID:</strong> {orderId}
                </p>
                <p className="mb-4 text-lg">
                  <strong>Current Status:</strong> {order?.deliverystatus}
                </p>
                <div className="mb-6">
                  <label className="block text-green-800 font-semibold mb-2" htmlFor="status">
                    Select New Status
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Packaging Done">Packaging Done</option>
                    <option value="Waiting for Pickup">Waiting for Pickup</option>
                    <option value="On the Road">On the Road</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {otpRequired && (
                  <div className="mb-6">
                    <label className="block text-green-800 font-semibold mb-2" htmlFor="otp">
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
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
