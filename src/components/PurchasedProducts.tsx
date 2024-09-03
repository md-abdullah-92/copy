import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  productid: string;
  name: string;
  image: string;
  soldprice: string;
  soldquantity: string;
  soldtime: string;
  sellername: string;
}

// Define the props interface
interface Props {
  buyeremail: string;
}

const PurchasedProducts: React.FC<Props> = ({ buyeremail }) => {
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnerProducts = async () => {
      console.log("Buyer Email:", buyeremail);
      
      try {
        setLoading(true);
        setError(null); // Reset error before fetching

        // Replace with actual backend API endpoint
        const response = await axios.get(`/api/purchased-products`, {
          params: { buyeremail: buyeremail },
        });

        setPurchasedProducts(response.data); // Correct state update function
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch purchased products.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProducts();
  }, [buyeremail]); // Include selleremail in dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchased Products</h2>
      {purchasedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {purchasedProducts.map((product) => (
            <div
              key={product.productid}
              className="bg-white rounded-lg shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-green -800  mt-2">Buyed Quantity: {product.soldquantity}</p>
                <p className="text-gray-800  mt-2">Cost : {product.soldprice} Tk</p>
                <p className="text-gray-800  mt-2">Seller Name : {product.sellername}</p>
              </div>
              {/* Overlay with action buttons on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300">
                  Add to Cart
                </button>
                <button className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300">
                  View Details
                </button>
                <button className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300">
                  Contact Farmer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No purchased products found.</p>
      )}
    </main>
  );
};

export default PurchasedProducts;
