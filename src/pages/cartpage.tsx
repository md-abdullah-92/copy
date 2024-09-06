import { useEffect, useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import Layout from '@/components/Layout/Layout';

interface Product {
  id: string;
  image: string;
  productname: string;
  price: string;
  description: string;
  category: string;
  quantity: string;
}

const CartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const email = localStorage.getItem('email'); // Fetch email from local storage
        const response = await axios.get('/api/cart', {
          params: { email },
        });
        setProducts(response.data);
      } catch (err) {
        setError('We were unable to retrieve the items in your cart. Please try again later.');
        console.error('Error fetching cart products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  // Function to handle removing a product from the cart
  const handleRemoveProduct = async (productId: string) => {
    try {
      const email = localStorage.getItem('email'); // Fetch email from local storage
      console.log('Email:', email);
      console.log('Product ID:', productId);
      const response = await axios.post('/api/removecart', {
        email, 
        id: productId
      });
      alert('Product removed from cart');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      console.log('Product removed:', response.data);
    } catch (err) {
      console.error('Error removing product:', err);
    }
  };
  
  const handleViewDetails = (id: string) => {
    router.push(`/product-details?id=${id}`);
  };


  

  if (loading) return <div className="text-center mt-10 text-lg">Loading, please wait...</div>;

  return (
    <Layout>
      <div className="bg-sky-200 min-h-screen p-10"> {/* Added light sky background here */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Your Shopping Cart</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {products.length === 0 ? (
          <div className="text-center text-gray-500">
          <p>Your cart is currently empty. Please add items to proceed with your purchase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.productname}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-5">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {product.productname}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-800 font-semibold mb-3">
                    ${product.price}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="bg-transparent text-red-500 px-3 py-1.5 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-600 transition-colors duration-300"
                      onClick={async () => {
                        // Add to shopping cart functionality
                      }}
                    >
                      Contact Farmer
                    </button>
                    <button
                      className="bg-transparent text-blue-500 px-3 py-1.5 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
