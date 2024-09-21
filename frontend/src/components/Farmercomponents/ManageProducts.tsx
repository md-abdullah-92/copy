import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaTrash, FaSpinner } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

interface Product {
  id: string;
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
  userid: string;
}

const ManageProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
    productId: string
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
    productId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log('Image URL:', url);
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
  // handleEditClick function to set the isEditing property to true
  const handleEditClick = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isEditing: true } : product
      )
    );
  };

  const handleSaveClick = async (productId: string) => {
    console.log("Save product id: ", productId);
  
    const productToSave = products.find((product) => product.id === productId);
  
    console.log("Product to save: ", productToSave);
  
    if (productToSave) {
      try {
        const response = await axios.put(`/api/editproduct`, productToSave);
  
        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? { ...product, isEditing: false } : product
            )
          );
          alert('Product updated successfully');
        } else {
          throw new Error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    } else {
      alert('Product not found');
    }
  };
  const [deleting, setDeleting] = useState<string | null>(null); // Track deleting product ID
  const handleDeleteClick = async (productId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    setDeleting(productId); // Track the product being deleted
    try {
      const response = await axios.delete(`/api/product`, { params: { id: productId } });
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };
  
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product) => (
          <div  key={product.id} className="max-w-xs rounded-md overflow-hidden shadow-md bg-gradient-to-r from-green-50 to-green-100 hover:from-green-200 hover:to-green-300 transition-shadow duration-300 ease-in-out p-4 border border-green-500">
         
            {product.isEditing ? (
              <>
                <input
                  type="text"
                  name="productname"
                  value={product.productname}
                  onChange={(e) => handleInputChange(e, product.id)}
                  className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                  placeholder="Enter product name"
                />
                <textarea
                  name="description"
                  value={product.description}
                  onChange={(e) => handleInputChange(e, product.id)}
                  className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                  placeholder="Enter product description"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, product.id)}
                  className="w-full mb-2"
                />
                <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, product.id)}
                    className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                    placeholder="Enter product price"
                    />
                <input
                    type="text"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleInputChange(e, product.id)}
                    className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                    placeholder="Enter product quantity"
                    />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={(e) => handleInputChange(e, product.id)}
                    className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                    placeholder="Enter product category"
                    />
                <input
                    type="text"
                    name="ownername"
                    value={product.ownername}
                    onChange={(e) => handleInputChange(e, product.id)}
                    className="w-full px-4 py-2 mb-2 border border-blue-300 rounded-lg"
                    placeholder="Enter owner name"
                    />


                <button
                  onClick={() => handleSaveClick(product.id)}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 shadow-md"
                >
                  <FaSave className="mr-2 inline" />
                  Save
                </button>
              </>
            ) : (
              <>
         
  <h3 className="text-xl font-bold text-green-900 mb-2 hover:text-green-700 transition-colors duration-200 tracking-wide shadow-md shadow-green-200">
    {product.productname}
  </h3>
  <img
    src={product.image}
    alt={product.productname}
    className="w-full h-40 object-cover rounded-md mb-3 transition-transform transform hover:scale-105 duration-300 border border-green-600"
  />
  <p className="text-sm text-green-800 mb-3">
    <b className="text-green-900 italic font-semibold">Price:</b> <span className="text-green-700 font-medium">{product.price}</span> &nbsp; 
    <b className="text-green-900 italic font-semibold">Quantity:</b> <span className="text-green-700 font-medium">{product.quantity}</span>
  </p>
  <p className="text-xs text-green-900 mb-2">
    <b className="text-green-900 italic font-semibold">Owner Name:</b> <span className="text-green-800">{product.ownername}</span>
  </p>
  <div className="flex space-x-2">

                 
                  <button
                      className="bg-transparent text-blue-500 px-3 py-1.5 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleEditClick(product.id)}
                    >
                    Edit
                    </button>
                    <button className="bg-transparent text-red-500 px-3 py-1.5 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-colors duration-300" onClick={() => handleDeleteClick(product.id)}>
                    {deleting === product.id ? <FaSpinner className="animate-spin inline" /> : 'Remove'}
                  </button>
                 
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
