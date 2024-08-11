import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from '@/components/Layout/Footer'; // Import your Header component
import Footer from '@/components/Layout/Footer'; // Import your Footer component

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  owner: string;
  price: number;
  category: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: 'Organic Apples',
    description: 'High-quality organic apples sourced from local farms.',
    image: '/assets/products/apple.jpg',
    rating: 4.5,
    owner: 'John Doe',
    price: 3.5,
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    description: 'Juicy and ripe tomatoes available in bulk.',
    image: '/assets/products/tomato.jpg',
    rating: 4.2,
    owner: 'Jane Smith',
    price: 2.0,
    category: 'Vegetables',
  },
  // Add more products as needed
];

export default function BrowseProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="bg-sky-200 min-h-screen">
      <Header /> {/* Include Header Component */}

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Browse Products
        </h1>

        <div className="mb-6 flex justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-600" />
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold text-gray-900 mt-4">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-800 font-bold mt-2">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mt-1">Owner: {product.owner}</p>
              <p className="text-yellow-500 mt-1">
                Rating: {product.rating} ⭐
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer /> {/* Include Footer Component */}
    </div>
  );
}
