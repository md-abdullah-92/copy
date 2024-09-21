import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const stripePromise = loadStripe("pk_test_51PuEpHRuCZ3PE4bbTAbBVHAReTC8Os4tWM8GbvONptKDflTbTyySzoRvUt4Z0W1WbcmHGcXVvus0fSAqTle2BZDm00GLHtmB9Z");



const Payment: React.FC = () => {
  const router = useRouter();
  const { 
    productid, 
    name,
    quantity,
    price, 
    totalPrice,
    selleremail,
    sellername,
    location, 
    deliveryMethod,
    category,
    image,
    sellerlocation,
    sellerorganization,
    sellerphone} = router.query;

    console.log("router", router.query);

  return (
    <>
      <Head>
        <title>Payment | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="bg-gradient-to-r from-green-50 to-sky-100 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-10 flex-grow mt-20">
          <div className="bg-green-100 p-10 shadow-lg rounded-lg text-center border border-green-300">
            <h1 className="text-3xl font-semibold text-green-900 mb-8">Complete Your Payment</h1>
            <p className="text-gray-700 mb-6">You are about to finalize your purchase. Please review the details below and proceed with payment.</p>
            <div className="mb-8">
              <p className="text-gray-800 text-lg">
                <strong>Product Name:</strong> {name}
              </p>
              <p className="text-gray-800 text-lg">
                <strong>Quantity:</strong> {quantity}
              </p>
              <p className="text-gray-800 text-lg">
                <strong>Total Amount:</strong> ${totalPrice}
              </p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm 
              productid={productid as string}
              name={name as string} 
              quantity={quantity as string} 
              price={price as string}
              totalPrice={totalPrice as string} 
              selleremail={selleremail as string} 
              sellername={sellername as string}
              location={location as string}
              deliveryMethod={deliveryMethod as string}
              category={category as string}
              image={image as string}
              sellerlocation={sellerlocation as string}
              sellerorganization={sellerorganization as string} 
              sellerphone={sellerphone as string}

              />
            </Elements>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
