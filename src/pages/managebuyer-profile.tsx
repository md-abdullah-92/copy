import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import getScrollAnimation from '@/utils/getScrollAnimation';

export default function UpdateProfile() {
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'buyer',
      avatar: null,  // Updated to hold file object
      gender: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      organization: '',
      bio: '',
    },

    validate: {
      name: (value) => (value.length === 0 ? 'Please fill up the field' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password not valid' : null),
      phone: (value) =>
        /^\d+$/.test(value) ? null : 'Phone number must contain only digits',
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = form.values;

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      const res = await axios.post('/api/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error');
      console.log(err);
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
                      <img src={avatarPreview} alt="Avatar Preview" className="rounded-full h-20 w-20 object-cover" />
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
                    placeholder="Your city"
                    {...form.getInputProps('city')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Zila
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your state"
                    {...form.getInputProps('state')}
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

                <div className="mt-8 text-center">
                  <ButtonPrimary  type="submit">
                    Update
                  </ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
