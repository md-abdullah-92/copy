import React from 'react';
import router from 'next/router';
import { usePurchasedProducts } from '@/hooks/usePurchasedProducts'; // import the custom hook

interface Props {
  buyeremail: string;
}

const PurchasedProducts: React.FC<Props> = ({ buyeremail }) => {
  const { purchasedProducts, loading, error } = usePurchasedProducts(buyeremail);

  const handleViewDetails = (id: string) => {
    router.push(`/soldproduct-details?id=${id}`);
  };

  const handleRateProduct = (productid: string, soldquantity: string) => {
    router.push(`/product-rating?productid=${productid}&soldquantity=${soldquantity}`);
  };

  const handleTrackOrder = (productid: string, deliverystatus: string) => {
    router.push(`/product-tracking?productid=${productid}&deliverystatus=${deliverystatus}`);
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchased Products</h2>

      {loading ? (
        <p className="text-gray-600">Loading purchased products...</p>
      ) : purchasedProducts.length > 0 ? (
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
                <h3 className="text-lg font-extrabold text-purple-800" style={{ fontFamily: 'cursive' }}>
                  {product.name}
                </h3>
                <p className="text-pink-700 text-sm">Purchased Quantity: {product.soldquantity}</p>
                <p className="text-red-700 text-sm">Total Cost: {product.soldprice} Tk</p>
                <p className="text-blue-700 text-sm">Seller: {product.sellername}</p>
                <p className="text-green-700 text-sm">Delivery Status: {product.deliverystatus}</p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300"
                  onClick={() => handleTrackOrder(product.productid, product.deliverystatus)}
                >
                  Track Order
                </button>
                <button
                  className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </button>
                <button
                  className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300"
                  onClick={() => handleRateProduct(product.productid, product.soldquantity)}
                >
                  Rate Product
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

export default React.memo(PurchasedProducts);
