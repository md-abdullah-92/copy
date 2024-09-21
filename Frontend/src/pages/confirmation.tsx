import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';


const Confirmation: React.FC = () => {
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
  } = router.query; // Retrieve purchase details from query parameters

  const goToProductList = () => {
    router.push('/BrowseProducts'); // Replace with your actual product list page path
  };
  
  const goTopaymentSlip = () => {
    router.push({
      pathname: '/paymentslip', // Path to the confirmation page
      query: { 
        productid, // Product ID
        name, // Product name
        quantity, // Quantity
        price, // Price per unit
        totalPrice, // Total price
        location, // Buyer location
        deliveryMethod, // Delivery method
        selleremail, // Seller email
        sellername, // Seller name
        category, // Product category
        image, // Product image
        sellerlocation, // Seller location
        sellerphone, // Seller phone
        sellerorganization, // Seller organization
      }
    });
  };

  return (
    <>
      <Head>
        <title>Order Confirmation | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="bg-gradient-to-r from-green-100 to-sky-200 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow mt-20">
          <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <h1 className="text-3xl font-bold text-green-900 mb-6">Thank You for Your Purchase!</h1>
            <p className="text-gray-700 mb-4">Your order has been successfully placed.</p>
            <div className="mb-6">
              <p className="text-gray-800 text-lg">
                <strong>Product:</strong> {name}
              </p>
              <p className="text-gray-800 text-lg">
                <strong>Quantity:</strong> {quantity}
              </p>
              <p className="text-gray-800 text-lg">
                <strong>Total Price:</strong> ${totalPrice}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={goToProductList}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={goTopaymentSlip}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Payment Slip
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Confirmation;
