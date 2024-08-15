import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
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
  const [wishlistCount, setWishlistCount] = useState<number>(2); // Replace with your actual logic to get the count
  const [cartCount, setCartCount] = useState<number>(3); // Replace with your actual logic to get the count

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
    const matchesSearchTerm =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col">
      <Header />
      <ScrollAnimationWrapper>
        {/* Search bar section */}
        <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            {/* Agribazaar Logo */}
            <div className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="Agribazaar Logo"
                width={80}
                height={80}
              />
            </div>

            {/* Search bar */}
            <div className="flex-grow flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-2xl mx-auto">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-2 border-r bg-gray-100 text-gray-700 rounded-l-full"
                aria-label="Select category"
              >
                <option value="">All Categories</option>
                {/* Other options */}
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
                onClick={() => console.log('Searching...')}
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>

            {/* Wishlist, Cart, and Account shortcuts */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => router.push('/wishlist')}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                  aria-label="Wishlist"
                >
                  <FaHeart size={24} />
                </button>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => router.push('/buyerdashboard#cart')}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                  aria-label="Cart"
                >
                  <FaShoppingCart size={24} />
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => router.push('/buyerdashboard')}
                className="text-gray-700 hover:text-green-600 transition-colors duration-300"
                aria-label="Account"
              >
                <FaUser size={24} />
              </button>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* Main content section */}
      <ScrollAnimationWrapper>
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
                    <p className="text-yellow-500 mr-2">
                      {product.rating} ⭐
                    </p>
                    <span className="text-sm text-gray-500">
                      ({product.rating})
                    </span>
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
