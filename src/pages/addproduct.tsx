import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';  // Ensure this path is correct

export default function UpdateProfile() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  type FormValues = {
    productname: string;
    image: string | null;
    description: string;
    category: string;
    price: string;
    quantity: string;


  };

  const form = useForm<FormValues>({
    initialValues: {
      productname: '',
      image: null,
      description: '',
      category: '',
      price: '',
      quantity: '',
    },
  });

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        form.setFieldValue('image', url);
        setImagePreview(url);
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { productname, image, description, category, price, quantity } = form.values;
    const ownername = localStorage.getItem('name');
    const owneremail = localStorage.getItem('email');
    const ownerorganization = localStorage.getItem('organization');
    const ownerupzila = localStorage.getItem('upazila');
    const ownerzila = localStorage.getItem('zila');
    const ownerdivision = localStorage.getItem('division');
    const ownerphone = localStorage.getItem('phone');


    const updateRequestBody = {
      productname,
      image,
      description,
      category,
      price,
      quantity,
      ownername,  
      owneremail,
      ownerorganization,
      ownerupzila,
      ownerzila,
        ownerdivision,
        ownerphone,
    };

    try {
      const response = await axios.post('/api/product', updateRequestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const role = localStorage.getItem('role');
        if (role === 'buyer') {
          window.location.href = '/buyerdashboard';
        } else if (role === 'farmer') {
          window.location.href = '/farmerdashboard';
        }
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Add Product | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div
          className="flex items-center justify-center"
          style={{
            height: '90vh',
            backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '600px',
            paddingBottom: '500px',
          }}
        >
          <div
            className="rounded-lg p-10 shadow-lg max-w-md w-full"
            style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #aed581',
              width: '500px',
            }}
          >
            <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
              Add Product
            </h1>
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    {...form.getInputProps('productname')}
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    {...form.getInputProps('description')}
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    placeholder="Provide a detailed product description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    {...form.getInputProps('category')}
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    placeholder="Enter product category"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    onChange={handleImageChange}
                  />
                  {uploading && <p>Uploading...</p>}
                  {imagePreview && (
                    <div className="mt-4">
                      <Image
                        src={imagePreview}
                        alt="Product Image Preview"
                        className="rounded-lg"
                        height={200}
                        width={200}
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    {...form.getInputProps('price')}
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    placeholder="Enter product price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    {...form.getInputProps('quantity')}
                    className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                    placeholder="Enter product quantity"
                  />
                </div>
                <div className="mt-8">
                  <ButtonPrimary type="submit">Add Product</ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
