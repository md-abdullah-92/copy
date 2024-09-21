import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig'; // Ensure this path is correct

const AddProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState({
    productname: '',
    description: '',
    image: '',
    category: '',
    price: '',
    quantity: '',
  });

  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // State for owner details fetched from localStorage
  const [ownerDetails, setOwnerDetails] = useState({
    ownername: '',
    owneremail: '',
    ownerorganization: '',
    ownerupzila: '',
    ownerzila: '',
    ownerdivision: '',
    ownerphone: '',
    ownerid: '',
  });

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== 'undefined') {
      setOwnerDetails({
        ownername: localStorage.getItem('name') || '',
        owneremail: localStorage.getItem('email') || '',
        ownerorganization: localStorage.getItem('organization') || '',
        ownerupzila: localStorage.getItem('upazila') || '',
        ownerzila: localStorage.getItem('zila') || '',
        ownerdivision: localStorage.getItem('division') || '',
        ownerphone: localStorage.getItem('phone') || '',
        ownerid: localStorage.getItem('id') || '',
      });
    }
  }, []);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setNewProduct({ ...newProduct, image: url });
        setProductImagePreview(url); // Set the preview URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddProduct = async () => {
    const newProductWithId = { ...newProduct, ...ownerDetails, id: Math.random() };

    try {
      const response = await axios.post('/api/product', newProductWithId, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Product added successfully:', response.data);
        setNewProduct({
          productname: '',
          description: '',
          image: '',
          category: '',
          price: '',
          quantity: '',
        });
        setProductImagePreview(null); // Clear the product image preview after adding the product
      } else {
        throw new Error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product: Please try again.');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Add New Product</h3>
      <input
        type="text"
        name="productname"
        value={newProduct.productname}
        onChange={(e) =>
          setNewProduct({ ...newProduct, productname: e.target.value })
        }
        placeholder="Product Name"
        className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
      />
      <textarea
        name="description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        placeholder="Product Description"
        className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
      />
      <input
        type="text"
        name="category"
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
        placeholder="Product Category"
        className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
      />

      <input
        type="text"
        name="price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        placeholder="Product Price"
        className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
      />

      <input
        type="text"
        name="quantity"
        value={newProduct.quantity}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: e.target.value })
        }
        placeholder="Product Quantity"
        className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
      />

      <input
        type="file"
        onChange={handleImageChange}
        className="w-full mb-2"
      />
      {uploading && <p className="text-gray-700">Your file is being uploaded. Please wait...</p>}
      {productImagePreview && (
        <img
          src={productImagePreview}
          alt="Product Preview"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <button
        onClick={handleAddProduct}
        className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
      >
        <FaPlusCircle className="mr-2 inline" />
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
