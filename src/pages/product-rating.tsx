// pages/ProductRating.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Star } from 'lucide-react';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const ProductRating: React.FC = () => {
  const router = useRouter();
  const { productid ,soldquantity } = router.query; // Extracting the product ID from the query parameters

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const soldproduct= soldquantity as string;
  console.log('Sold Quantity:',soldproduct);
  console.log('Product ID:',productid);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Resetting error and success messages
      setError(null);
      setSuccess(null);

      // Validate required fields
      if (!rating || rating < 1 || rating > 5) {
        setError('Please provide a rating between 1 and 5.');
        return;
      }

      // Sending rating data to the API
      await axios.put('/api/rate-product',{} , {
        params: { 
          productid, 
          rating, 
          soldproduct 
        },
      }
      );

      // Display success message
      setSuccess('Your rating has been submitted successfully.');
      alert('Your rating has been submitted successfully.');
      // Redirect to the buyer dashboard
      router.push('/buyerdashboard');
    } catch (err) {
      console.error('An error occurred while submitting the rating:', err);
      setError('Failed to submit your rating. Please try again later.');
    }
  };

  const renderStars = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`focus:outline-none ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          <Star className="w-6 h-6" />
        </button>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>Rate Product | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Header/>
     
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-sky-200">
        {/* Main Content */}
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Rate This Product</h2>

            {error && <p className="text-red-500 text-sm font-medium text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-sm font-medium text-center mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                {renderStars()}
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">Review (Optional):</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="block w-full mt-1 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Share your thoughts about the product..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                Submit Rating
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductRating;
