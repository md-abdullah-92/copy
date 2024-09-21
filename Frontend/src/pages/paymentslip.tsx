import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter to access query parameters
import Header from '@/components/Layout/Header'; 
import Footer from '@/components/Layout/Footer'; 

const PaymentSlip = () => {
  const router = useRouter();
  const { 
    productid,
    name,
    quantity,
    price,
    totalPrice,
    location,
    deliveryMethod,
    selleremail,
    sellerlocation,
    sellername,
    category,
    image,
    sellerphone,
    sellerorganization,
  } = router.query; // Retrieve the query parameters

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col print:bg-white print:shadow-none">
      <Header />

      <div className="flex-grow flex items-center justify-center py-16 mt-12">
        <div className="max-w-3xl w-full px-8 py-10 bg-white rounded-lg shadow-xl border border-gray-200 print:border-none print:shadow-none">
          <h1 className="text-4xl font-extrabold text-green-800 text-center mb-8">
            Payment Slip
          </h1>

          <div className="mb-8 p-6 bg-green-50 rounded-lg shadow-inner border border-green-200 print:shadow-none print:border-none">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Order Summary</h2>

            {/* Use the retrieved query parameters to display dynamic data */}
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Farmer:</span>
              <span>{sellername}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Item:</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Price per Item:</span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Total:</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Delivery Location:</span>
              <span>{location}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Delivery Method:</span>
              <span>{deliveryMethod}</span>
            </div>
            <div className="flex justify-between text-green-800 mb-2">
              <span className="font-medium text-green-600">Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="text-center mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors duration-300"
            >
              Print Payment Slip
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSlip;
