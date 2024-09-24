import React, { useEffect, useState } from 'react';
import router from 'next/router';
import axios from 'axios';

interface Product {
  id: string;
  productid: string;
  name: string;
  image: string;
  soldprice: string;
  soldquantity: string;
  soldtime: string;
  sellername: string;
  deliverystatus: string;
}

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
        setError(null);

        const response = await axios.get(`/api/purchased-products`, {
          params: { buyeremail },
        });

        setPurchasedProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch purchased products.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProducts();
  }, [buyeremail]);

  const handleViewDetails = (id: string) => {
    router.push(`/soldproduct-details?id=${id}`);
  };

  const handleRateProduct = (productid: string,soldquantity:string) => {
    router.push(`/product-rating?productid=${productid}&soldquantity=${soldquantity}`);
  }

  return (
   
    <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchased Products</h2>
      
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
                <div className="p-1">
                  <h3 className="text-lg font-extrabold text-purple-800" style={{ fontFamily: 'cursive' }}>
                    {product.name}
                  </h3>

                  <div className="mt-1 text-base">
                    <p className="text-pink-700 text-sm">
                      <span className="font-semibold">Purchased Quantity:</span> {product.soldquantity}
                    </p>
                    <p className="text-red-700 mt-1 text-sm">
                      <span className="font-semibold">Total Cost:</span> {product.soldprice} Tk
                    </p>
                    <p className="text-blue-700 mt-1 text-sm">
                      <span className="font-semibold">Seller:</span> {product.sellername}
                    </p>
                    <p className="text-green-700 mt-1 text-sm">
                      <span className="font-semibold">Delivery Status:</span> {product.deliverystatus}
                    </p>
                  </div>
                </div>

              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300"
                onClick={() => {
                  console.log('Product:', product); // Debugging line
                  console.log('Product ID:', product.productid); // Debugging line
                  console.log('Delivery Status:', product.deliverystatus); // Debugging line
                  if (product && product.productid && product.deliverystatus) {
                    router.push(`/product-tracking?productid=${product.productid}&deliverystatus=${product.deliverystatus}`);
                  } else {
                    console.error('Product ID or Delivery Status is undefined');
                  }
                }}
              >
                Track Order
              </button>

                <button
                  className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300"
                  onClick={
                    () => handleViewDetails(product.id)
                  }
                  aria-label="View Details"
                >
                  View Details
                </button>
                <button
                  className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300"
                  aria-label="Rate Product"
                  onClick={() => handleRateProduct(product.productid, product.soldquantity)}
                
                >
                  Rate Product
                </button>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
};

export default React.memo(PurchasedProducts);
