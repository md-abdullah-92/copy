import React, { useState } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  id: string;
  name: string ;
  quantity: string;
  totalPrice: string ;
  category: string ;
  selleremail: string ;
  sellername: string ;
  location: string ;
  deliveryMethod: string ;
  image: string ;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ id, name, quantity, totalPrice, category, selleremail, sellername, location, deliveryMethod ,image}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  console.log("id 1st",id);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
      return;
    }
    try {
      // Update the product quantity and total sales
      const updateProductStatus = async () => {
        try {
          console.log("ID 2nd:", id); 
          console.log("Quantity:", quantity);
      
          // Check for undefined or invalid values
          if (!id) {
            console.error("Error: Missing or invalid ID.");
            return;
          }
          if (!quantity) {
            console.error("Error: Missing or invalid quantity.");
            return;
          } 
          
          // Sending the PUT request to the Next.js API endpoint
          const response = await axios.put('/api/product', {}, {
            params: {
              id, 
              quantity,
            },
          });
      
          console.log('Product status updated:', response.data);
          console.log("ID 3rd:", id);
        } catch (err) {
          console.error('Error updating product status:', err.response?.data || err.message);
        }
      };
      
      // Calling the update function
      await updateProductStatus();
      
    
    

      // Post the order details to the database
      const postOrder = async () => {
        try {
          const response = await axios.post('/api/soldproducts', {
            id: id,
            name: name,
            category: category,
            selleremail: selleremail,
            sellername: sellername,
            location: location,
            deliveryMethod: deliveryMethod,
            soldprice: totalPrice,
            soldquantity: quantity,
            soldtime: new Date().toISOString(),
            image: image,
          });
          console.log('Order posted:', response.data);
        } catch (err) {
          console.error('Error posting order:', err);
        }
      };

      await postOrder();

      setPaymentStatus('Payment was successful.');
    } catch (err) {
      console.error('Error during payment process:', err);
      setErrorMessage('An unexpected error occurred while processing your payment.');
    } finally {
      setIsProcessing(false);
    }
  };
  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#333',
        fontFamily: '"Lato", sans-serif',
        '::placeholder': {
          color: '#b0b0b0',
        },
        padding: '10px 12px',
        border: '2px solid #e0e0e0',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9',
      },
      invalid: {
        color: '#e63946',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
      <p className="text-gray-600 mb-4">Please enter your payment information below:</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <CardNumberElement options={elementOptions} className="p-2 rounded-md focus:ring-green-600 focus:border-green-600" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
          <CardExpiryElement options={elementOptions} className="p-2 rounded-md focus:ring-green-600 focus:border-green-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
          <CardCvcElement options={elementOptions} className="p-2 rounded-md focus:ring-green-600 focus:border-green-600" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full bg-green-600 text-white py-3 rounded-md shadow-md transition duration-300 
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
      >
        {isProcessing ? 'Processing Payment...' : 'Submit Payment'}
      </button>

      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}
      {paymentStatus && (
        <div className="text-green-600 text-sm mt-2">{paymentStatus}</div>
      )}
    </form>
  );
};

export default CheckoutForm;
