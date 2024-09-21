import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import { useProductDetails } from '@/hooks/useProductDetails'; // Import the hook

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Use the custom hook for fetching product details
  const { product, loading, error } = useProductDetails(id);

  if (loading) return <p className="text-center text-gray-700 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!product) return <p className="text-center text-gray-600 mt-10">Product not found.</p>;

  return (
    <>
      <Head>
        <title>{product.name} - Agribazaar</title>
      </Head>
      <Layout>
        {/* Main container with some padding and margin adjustments bg color will be light sky */}
        <main className="max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-12 mt-20 bg-sky-200">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">{product.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            <div className="flex justify-center items-center">
              {/* Product Image with hover effect */}
              <div className="w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-300 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-10">
              {/* Product Details Card */}
              <div className="border rounded-lg p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Product Details</h3>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Price:</span> {product.price} Tk
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Sold Time:</span> {product.soldtime}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Sold Quantity:</span> {product.soldquantity}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Sold Price:</span> {product.soldprice} Tk
                </p>
              </div>

              {/* Delivery Information Card */}
              <div className="border rounded-lg p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Delivery Information</h3>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Status:</span> {product.deliverystatus}
                </p>
                {product.deliverytime && (
                  <p className="text-md text-gray-700">
                    <span className="font-semibold">Delivery Time:</span> {product.deliverytime}
                  </p>
                )}
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Delivery Location:</span> {product.deliverytoaddress}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Expected By:</span> {product.deliverybydate}
                </p>
              </div>

              {/* Seller Information Card */}
              <div className="border rounded-lg p-6 bg-white shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Seller Information</h3>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Name:</span> {product.sellername}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Email:</span> {product.selleremail}
                </p>
                <p className="text-md text-gray-700">
                  <span className="font-semibold">Location:</span> {product.deliverybyaddress}
                </p>
              </div>

              {/* Back Button with enhanced styling */}
              <button
                className="mt-8 w-full bg-green-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default ProductDetails;
