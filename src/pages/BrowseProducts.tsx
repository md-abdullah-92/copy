import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';

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
  {
    id: 3,
    name: 'Whole Grain Wheat',
    description: 'Premium quality wheat harvested from sustainable farms.',
    image: '/assets/products/wheat.jpg',
    rating: 4.8,
    owner: 'Alice Johnson',
    price: 1.5,
    category: 'Grains',
  },
  {
    id: 4,
    name: 'Fresh Milk',
    description: 'Organic and fresh milk directly from local dairy farms.',
    image: '/assets/products/milk.jpg',
    rating: 4.7,
    owner: 'Bob Brown',
    price: 1.2,
    category: 'Dairy',
  },
  {
    id: 5,
    name: 'Free-Range Eggs',
    description: 'Farm-fresh eggs from free-range chickens.',
    image: '/assets/products/eggs.jpg',
    rating: 4.9,
    owner: 'Emily Davis',
    price: 2.5,
    category: 'Dairy',
  },
  {
    id: 6,
    name: 'Local Honey',
    description: 'Natural honey harvested from local beekeepers.',
    image: '/assets/products/honey.jpg',
    rating: 4.6,
    owner: 'Michael Lee',
    price: 6.0,
    category: 'Sweeteners',
  },
];

export default function BrowseProducts() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleViewDetails = (id: number) => {
    router.push(`/product-details?id=${id}`);
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      product.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col">
      <Header />
      <ScrollAnimationWrapper>
      {/* Search bar section */}
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border-r bg-gray-100 text-gray-700 rounded-l-full"
              aria-label="Select category"
            >
              <option value="">All Categories</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Grains">Grains</option>
              <option value="Dairy">Dairy</option>
              <option value="Sweeteners">Sweeteners</option>
              {/* Add more categories as needed */}
            </select>
            <input
              type="text"
              placeholder="Search for Products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border-none focus:outline-none rounded-r-full"
              aria-label="Search for products"
            />
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
              onClick={() => console.log('Searching...')} // Add your search functionality here
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
      {/* Main content section */}
      <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gray-800 font-bold mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <p className="text-yellow-500 mr-2">{product.rating} ⭐</p>
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-300">
                  Add to Cart
                </button>
                <button
                  className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </button>
                <button className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm hover:text-green-700 transition-colors duration-300">
                  Contact Farmer
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      </ScrollAnimationWrapper>
      <Footer />
    </div>
  );
}
