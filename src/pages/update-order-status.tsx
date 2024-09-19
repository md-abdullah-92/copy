import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout/Layout';

const UpdateOrderStatus: React.FC = () => {
  const router = useRouter();
  const { orderId, status } = router.query;

  const [order, setOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>(status as string);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
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
      try {
        setOtpRequired(true);
      } catch (err) {
        console.error('Error sending OTP:', err);
        setError('Failed to send OTP. Please try again.');
      }
    } else {
      setOtpRequired(false);
    }
    // For other status
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    
    if (newStatus === 'Delivered' && otpRequired && otpString.length !== 4) {
      setError('Please enter the 4-digit OTP sent to the buyer.');
      return;
    }
    else if (newStatus === 'Delivered' && otpRequired && otpString.length === 4) {
      // Send OTP to the backend for verification
      try {
        console.log('Verifying OTP:', otpString);
        console.log('Order ID:', orderId);
        const code = otpString as string;
        const id = orderId as string;
        const response = await axios.put('/api/verify', {}, {
          params: {
            code,
            id,
          },
        });
        if (response.status === 200) {
          console.log('OTP verified successfully');
        // set alert
          alert('OTP verified successfully');
          router.push('/orders');
        } else {
          alert('Invalid OTP. Please try again.');
          return;
        }
      } catch (err) {
        console.error('Error verifying OTP:', err);
        setError('Failed to verify the OTP. Please try again.');
        return;
      }
    }
    else if (newStatus !== 'Delivered') 
    try {
      console.log("new", orderId);
      console.log(newStatus);

      const id = orderId as string;
      const deliverystatus = newStatus as string;

      if (!id) {
        console.error("Error: Missing or invalid ID.");
        return;
      }
      if (!newStatus) {
        console.error("Error: Missing or invalid status.");
        return;
      }

      const response = await axios.put('/api/orders', {}, {
        params: {
          id,
          deliverystatus,
        },
      });

      alert('Order status updated successfully');
      router.back(); // Navigate back to the previous page
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update the order status. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-sky-300 flex items-center justify-center py-10">
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
                    <option value="Order Received">Order Received</option>
                    <option value="Packaging Done">Packaging Done</option>
                    <option value="Waiting for Pickup">Waiting for Pickup</option>
                    <option value="On the Road">On the Road</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {otpRequired && (
                  <div className="mb-6">
                    <label className="block text-green-800 font-semibold mb-2" htmlFor="otp">
                      Enter 4-digit OTP
                    </label>
                    <div className="flex space-x-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="w-12 px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                        />
                      ))}
                    </div>
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
