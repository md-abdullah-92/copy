import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import axios from 'axios';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';

interface Product {
  id: number;
  productname: string;
  description: string;
  image: string;
  rating: number;
  ownername: string;
  price: number;
  category: string;
}

export default function BrowseProducts() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [wishlistCount, setWishlistCount] = useState<number>(2); // Replace with your actual logic to get the count
  const [cartCount, setCartCount] = useState<number>(3); // Replace with your actual logic to get the count
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/getallproduct');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleViewDetails = (id: number) => {
    router.push(`/product-details?id=${id}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearchTerm =
      product.productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                  alt={product.productname}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.productname}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-800 font-bold mt-2">
                    ${product.price}
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
