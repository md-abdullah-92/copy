import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';  // Ensure this path is correct

export default function UpdateProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  type FormValues = {
  //  email: string;
    name: string;
    password: string;
    gender: string;
    phone: string;
    address: string;
    upazila: string;
    zila: string;
    divtion: string;
    organization: string;
    avatar: string ; // Avatar is now a string (URL)
  };

  const form = useForm<FormValues>({
    initialValues: {
   //   email: '',
      name: '',
      password: '',
      gender: '',
      phone: '',
      address: '',
      upazila: '',
      zila: '',
      divtion: '',
      organization: '',
      avatar: '', // Initialize with null
    },
  });

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        form.setFieldValue('avatar', url);  // Set the uploaded URL in the form
        setAvatarPreview(url);  // Set preview to the uploaded URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const type = localStorage.getItem('role');
    const id=localStorage.getItem('id');
    
    
    const values = form.values;
    const updatechatRequestBody = {
      id,
      name: values.name,
      avatar: values.avatar,
      type: type,
    };
    
    try {
      const res = await axios.post('/api/chats/users', updatechatRequestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        console.log('chat CProfile updated successfully');
      }
    }
    catch (err: any) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: Please try again.');
    }
  
    const updateRequestBody = {
      name: values.name,
      password: values.password,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      upazila: values.upazila,
      zila: values.zila,
      organization: values.organization,
      avatar: values.avatar,
    };
   
  
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = '/login';
        return;
      }
  
      const res = await axios.put('/api/update', updateRequestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { email }
      });
  
      if (res.status === 200) {
        const role = localStorage.getItem('role');
        if (role === 'buyer') {
          window.location.href = '/buyerdashboard';
        } else if (role === 'farmer') {
          window.location.href = '/farmerdashboard';
        }
      } else {
        throw new Error(res.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: Please try again.');
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
              backgroundColor: '#e6f7e6',
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
                  {uploading && <p>Uploading...</p>}
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
                    Division
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your Division"
                    {...form.getInputProps('divtion')}
                  />
                </div>
                
                
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your Organization"
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