import React, { useState } from 'react';
import {
  FaUserCircle,
  FaTractor,
  FaBox,
  FaChartLine,
  FaEnvelope,
  FaSignOutAlt,
  FaEdit,
  FaPlusCircle,
  FaSave,
} from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';

export default function DashboardProfile() {
  // State to manage the product list
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Apples',
      description: 'High-quality organic apples sourced from local farms.',
      image: '/path/to/image.jpg', // Placeholder image path
      isEditing: false,
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      description: 'Crunchy and fresh carrots.',
      image: '/path/to/image2.jpg', // Placeholder image path
      isEditing: false,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleEditClick = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, isEditing: true } : product
      )
    );
  };

  const handleSaveClick = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, isEditing: false } : product
      )
    );
    // Update the product list with the new details
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [name]: value } : product
      )
    );
  };

  const handleImageUpload = (e, id) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, image: imageUrl } : product
        )
      );
    }
  };

  const handleAddProduct = () => {
    const newProductWithId = {
      ...newProduct,
      id: products.length + 1,
      isEditing: false,
    };
    setProducts([...products, newProductWithId]);
    setNewProduct({ name: '', description: '', image: '' }); // Reset form
  };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center">
                <FaUserCircle className="text-7xl text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  John Doe
                </h2>
                <p className="text-sm text-gray-600">Farmer</p>
                <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                  Edit Profile
                </button>
                <button className="mt-4 w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center">
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
              <nav className="mt-12">
                <ul className="space-y-6">
                  <li>
                    <a
                      href="#dashboard"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaChartLine className="mr-3" />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#products"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaBox className="mr-3" />
                      Manage Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#orders"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaTractor className="mr-3" />
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#messages"
                      className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300"
                    >
                      <FaEnvelope className="mr-3" />
                      Messages
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              {/* Dashboard Overview */}
              <section
                id="dashboard"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-green-900">
                      Total Products
                    </h3>
                    <p className="text-3xl font-bold text-green-700 mt-3">150</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-green-900">
                      Total Orders
                    </h3>
                    <p className="text-3xl font-bold text-green-700 mt-3">320</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-green-900">
                      Messages
                    </h3>
                    <p className="text-3xl font-bold text-green-700 mt-3">12</p>
                  </div>
                </div>
              </section>

              {/* Manage Products Section */}
              <section
                id="products"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Manage Products
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      {product.isEditing ? (
                        <>
                          <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={(e) => handleInputChange(e, product.id)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                          />
                          <textarea
                            name="description"
                            value={product.description}
                            onChange={(e) => handleInputChange(e, product.id)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            rows={3}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, product.id)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                          <button
                            onClick={() => handleSaveClick(product.id)}
                            className="mt-4 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                          >
                            <FaSave className="mr-2" />
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-700 mt-2">
                            {product.description}
                          </p>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="mt-4 w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleEditClick(product.id)}
                            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                          >
                            <FaEdit className="mr-2" />
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add New Product */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add New Product
                  </h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <textarea
                    name="description"
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    rows={3}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const imageUrl = URL.createObjectURL(e.target.files[0]);
                        setNewProduct({ ...newProduct, image: imageUrl });
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <button
                    onClick={handleAddProduct}
                    className="mt-4 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <FaPlusCircle className="mr-2" />
                    Add Product
                  </button>
                </div>
              </section>
              {/* Orders Section */}
              <section
                id="orders"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Order #12345
                  </h3>
                  <p className="text-gray-600 mt-2">
                    50kg of Organic Apples - Status: Shipped
                  </p>
                </div>
                {/* Additional orders can be listed here */}
              </section>

              {/* Messages Section */}
              <section
                id="messages"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Messages
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Message from Buyer
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Inquiry about the availability of fresh tomatoes.
                  </p>
                </div>
                {/* Additional messages can be listed here */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
