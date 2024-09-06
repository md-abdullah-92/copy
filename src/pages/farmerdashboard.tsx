import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig'; // Ensure this path is correct
import { em } from '@mantine/core';
import AddProduct from '@/components/Addproducts';
import ManageProduct from '@/components/Manageproducts';

export default function DashboardProfile() {
  // Profile and User State
  const [profiles, setProfiles] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({ name: '', role: '', email: '', avatarurl: '' });
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  

  
 

  const [newProduct, setNewProduct] = useState({
    productname: '',
    description: '',
    image: '',
    category: '',
    price: '',
    quantity: '',
    ownername: '',
    owneremail: '',
    ownerorganization: '',
    ownerupzila: '',
    ownerzila: '',
    ownerdivision: '',
    ownerphone: '',
  });

  // State for Image Upload
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.push('/login');
    } else {
      const getData = async () => {
        try {
          const res = await axios.get('/api/getone', {
            headers: {
              Authorization: `${token}`,
            },
            params: { role },
          });
          const profiles = res.data;
          setProfiles(profiles);
          localStorage.setItem('email', profiles.email);
          localStorage.setItem('name', profiles.name);
          localStorage.setItem('organization', profiles.organization);
          localStorage.setItem('upazila', profiles.upazila);
          localStorage.setItem('zila', profiles.zila);
          localStorage.setItem('division', profiles.division);
          localStorage.setItem('phone', profiles.phone);
         
          
          setLoggedInUser({
            name: profiles.name,
            role: profiles.role,
            email: profiles.email,
            avatarurl: profiles.avatar,
          });
        } catch (err) {
          console.error('Error fetching profile data:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          router.push('/login');
        }
      };
      getData();
    }
  }, [router]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   const email = localStorage.getItem('email');
    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        // Replace with actual backend API endpoint and ensure it matches correctly
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

    if (email) { // Ensure ownerEmail is provided before fetching
      fetchOwnerProducts();
    }
  }, []); // Dependency on ownerEmail ensures data is fetched when it changes

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setNewProduct({ ...newProduct, image: url }); // Assuming setNewProduct is correctly defined
        setProductImagePreview(url); // Set the preview URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center">
                {/* Check if avatarurl is valid and render the image */}
                {loggedInUser.avatarurl ? (
                  <img
                    src={loggedInUser.avatarurl}
                    alt={`${loggedInUser.name}'s Avatar`}
                    className="w-28 h-28 rounded-full object-cover"
                  
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-green-600" />
                )}
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {loggedInUser.name || 'John Doe'}
                </h2>
                <p className="text-sm text-gray-600">{loggedInUser.role || 'Farmer'}</p>
                <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                onClick={() => router.push('/update-profile')}
                >
                  Edit Profile
                </button>
                <button
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                  onClick={() => setShowSignOutConfirm(true)}
                >
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
                  <Link href="/orders" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
      <FaTractor className="mr-3" />
      Orders
    </Link>
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
                
                <ManageProduct />
                </div>
                <AddProduct />
               
              </section>
            </div>
          </div>
        </div>

        {/* Sign Out Confirmation Modal */}
        {showSignOutConfirm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Confirm Sign Out</h3>
              <p className="mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-full mr-4 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}