import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import getScrollAnimation from '@/utils/getScrollAnimation';
import Image from 'next/image';  // Import the Image component

export default function UpdateProfile() {
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  type FormValues = {
    email: string;
    name: string;
    password: string;
    gender: string;
    phone: string;
    address: string;
    upazila: string;
    zila: string;
    organization: string;
    avatar?: File | null; // Optional avatar field, can be a File or null
  };
  
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      gender: '',
      phone: '',
      address: '',
      upazila: '',
      zila: '',
      organization: '',
      avatar: null, // Initialize with null
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = form.values;

    const formData = new FormData();
    if (values.name) formData.append('name', values.name);
    if (values.password) formData.append('password', values.password);
    if (values.gender) formData.append('gender', values.gender);
    if (values.phone) formData.append('phone', values.phone);
    if (values.address) formData.append('address', values.address);
    if (values.upazila) formData.append('upazila', values.upazila);
    if (values.zila) formData.append('zila', values.zila);
    if (values.organization) formData.append('organization', values.organization);
    if (values.avatar) {
      formData.append('avatar', values.avatar);
    }

    try {
      const email = localStorage.getItem('email');
      console.log('email', email);
      formData.append('email', email || '');
      if (!email) {
        window.location.href = '/login';
        return;
      }

      const res = await axios.put(
        '/api/update', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            email: email
          }
        }
      );

      if (res.status === 200) {
        const role = localStorage.getItem('role');
        if (role === 'buyer') {
          window.location.href = '/buyerdashboard';
        } else if (role === 'farmer') {
          window.location.href = '/farmerdashboard';
        }
      } else {
        const errorMessage = res.data.message || 'Failed to update profile';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: Please try again.');
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      form.setFieldValue('avatar', file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Head>
        <title>Update Profile | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div
          className="flex items-center justify-center"
          style={{
            height: 'calc(100vh - 120px)',
            backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '700px',
            paddingBottom: '600px',
          }}
        >
          <div
            className="rounded-lg p-10 shadow-lg transition-transform transform hover:scale-105"
            style={{
              backgroundColor: '#e6f7e6',  // Light green color
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
            }}
          >
            <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
              Update Profile
            </h1>
             <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your name"
                    required
                    {...form.getInputProps('name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your password"
                    required
                    {...form.getInputProps('password')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    onChange={handleAvatarChange}
                  />
                  {avatarPreview && (
                    <div className="mt-4">
                      <Image 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="rounded-full" 
                        height={80} 
                        width={80} 
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Gender
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    {...form.getInputProps('gender')}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Phone
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your phone number"
                    {...form.getInputProps('phone')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your address"
                    {...form.getInputProps('address')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Upazila
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your Upazila"
                    {...form.getInputProps('upazila')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Zila
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your Zila"
                    {...form.getInputProps('zila')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your organization"
                    {...form.getInputProps('organization')}
                  />
                </div>
                <div className="pt-4 text-center">
                  <ButtonPrimary type="submit">Update Profile</ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
