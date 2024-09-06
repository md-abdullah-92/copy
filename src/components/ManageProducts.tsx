import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { FaEdit, FaSave } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig'; // Ensure this path is correct

interface Product {
  id: number;
  productname: string;
  description: string;
  image: string;
  category: string;
  price: string;
  quantity: string;
  ownername: string;
  owneremail: string;
  ownerorganization: string;
  ownerupzila: string;
  ownerzila: string;
  ownerdivision: string;
  ownerphone: string;
  isEditing?: boolean;
}

const ManageProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch products owned by the logged-in user
  useEffect(() => {
    const email = localStorage.getItem('email');

    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/product`, {
          params: { owneremail: email },
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchOwnerProducts();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productId: number
  ) => {
    const { name, value } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, [name]: value } : product
      )
    );
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, image: url } : product
          )
        );
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleEditClick = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isEditing: true } : product
      )
    );
  };

  const handleSaveClick = async (productId: number) => {
    const productToSave = products.find((product) => product.id === productId);

    if (productToSave) {
      try {
        const response = await axios.put(
          `/api/product/${productId}`,
          productToSave
        );
        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? { ...product, isEditing: false } : product
            )
          );
        } else {
          throw new Error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-green-50 p-6 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-300"
          >
            {product.isEditing ? (
              <>
                <input
                  type="text"
                  name="productname"
                  value={product.productname}
                  onChange={(e) => handleInputChange(e, product.id)}
                  className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
                  placeholder="Enter product name"
                />
                <textarea
                  name="description"
                  value={product.description}
                  onChange={(e) => handleInputChange(e, product.id)}
                  className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
                  placeholder="Enter product description"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, product.id)}
                  className="w-full mb-2"
                />
                <button
                  onClick={() => handleSaveClick(product.id)}
                  className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                >
                  <FaSave className="mr-2 inline" />
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  {product.productname}
                </h3>
                <img
                  src={product.image}
                  alt={product.productname}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-lg text-gray-700 mb-4">
                  <b>Price:</b> {product.price} &nbsp; <b>Quantity:</b>{' '}
                  {product.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Owner Name: {product.ownername}
                </p>
                <button
                  onClick={() => handleEditClick(product.id)}
                  className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  <FaEdit className="mr-2 inline" />
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageProduct;