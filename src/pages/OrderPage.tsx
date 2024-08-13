import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

const sampleProduct: Product = {
  id: 1,
  name: 'Organic Apples',
  description: 'High-quality organic apples sourced from local farms.',
  image: '/assets/products/apple.jpg',
  price: 3.5,
  quantity: 1,
};

// Hierarchical location data
const locations = {
  Dhaka: {
    upazilas: {
      Dhanmondi: { postalCode: '1209', cost: 50 },
      Gulshan: { postalCode: '1212', cost: 60 },
    },
  },
  Chittagong: {
    upazilas: {
      Kotwali: { postalCode: '4000', cost: 70 },
      Pahartali: { postalCode: '4202', cost: 80 },
    },
  },
  Sylhet: {
    upazilas: {
      Zindabazar: { postalCode: '3100', cost: 90 },
      Ambarkhana: { postalCode: '3203', cost: 100 },
    },
  },
};

export default function OrderPage() {
  const [quantity, setQuantity] = useState<number>(sampleProduct.quantity);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dhaka');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('Dhanmondi');

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handlePlaceOrder = () => {
    // Logic to handle order placement
    alert(
      `Order placed successfully for delivery in ${selectedUpazila}, ${selectedDistrict}, Bangladesh!`
    );
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setSelectedUpazila(Object.keys(locations[district].upazilas)[0]); // Reset upazila to the first one
  };

  const handleUpazilaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUpazila(event.target.value);
  };

  const calculateTotal = () => {
    const deliveryCost = locations[selectedDistrict].upazilas[selectedUpazila].cost;
    return (sampleProduct.price * quantity + deliveryCost).toFixed(2);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-pink-100 min-h-screen flex flex-col">
      <Header /> {/* Include Header Component */}

      <main className="flex-grow max-w-4xl mx-auto py-24 px-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">
          Confirm Your Order
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <img
            src={sampleProduct.image}
            alt={sampleProduct.name}
            className="w-full md:w-1/3 h-auto rounded-lg object-cover"
          />
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-gray-900">
              {sampleProduct.name}
            </h2>
            <p className="text-gray-600 mt-4">{sampleProduct.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-6">
              Price: ${sampleProduct.price.toFixed(2)}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mt-6">
              <label className="mr-2 text-gray-700">Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-red-400 text-white p-2 rounded-full hover:bg-red-500 transition duration-300"
                >
                  <FaMinus />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border border-gray-300 rounded-md p-2 bg-gray-100"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-green-400 text-white p-2 rounded-full hover:bg-green-500 transition duration-300"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Location Selector */}
            <div className="mt-6">
              <label className="mr-2 text-gray-700">District:</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="border border-gray-300 rounded-md p-2 bg-gray-100"
              >
                {Object.keys(locations).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="mr-2 text-gray-700">Upazila:</label>
              <select
                value={selectedUpazila}
                onChange={handleUpazilaChange}
                className="border border-gray-300 rounded-md p-2 bg-gray-100"
              >
                {Object.keys(locations[selectedDistrict].upazilas).map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label className="mr-2 text-gray-700">Postal Code:</label>
              <input
                type="text"
                value={locations[selectedDistrict].upazilas[selectedUpazila].postalCode}
                readOnly
                className="border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <p className="text-lg font-bold text-gray-800 mt-6">
              Total: ৳{calculateTotal()}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              Place Order
            </button>
          </div>
        </div>
      </main>

      <Footer /> {/* Include Footer Component */}
    </div>
  );
}
