import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';  // Import Firebase storage configuration

export default function UpdateProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  type FormValues = {
    //email: string;
    name: string;
    password: string;
    gender: string;
    phone: string;
    address: string;
    upazila: string;
    zila: string;
    organization: string;
    avatar: string | null; // Avatar is now a string (URL)
  };

  const form = useForm<FormValues>({
    initialValues: {
     // email: '',
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

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log('Uploaded file URL:', url);
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
    const values = form.values;
    
    const formData = new FormData();
   // formData.append('email', values.email || '');
    if (values.name) formData.append('name', values.name);
    if (values.password) formData.append('password', values.password);
    if (values.gender) formData.append('gender', values.gender);
    if (values.phone) formData.append('phone', values.phone);
    if (values.address) formData.append('address', values.address);
    if (values.upazila) formData.append('upazila', values.upazila);
    if (values.zila) formData.append('zila', values.zila);
    if (values.organization) formData.append('organization', values.organization);
    if (values.avatar) {
      formData.append('avatar', values.avatar); // Add URL to form data
    }

    try {
      const email = localStorage.getItem('email');
      formData.append('email', email || '');
      if (!email) {
        window.location.href = '/login';
        return;
      }

      const res = await axios.putForm(
        '/api/update',
        formData,
        {
          headers: {
            'content-type': 'application/json',
          },
          params: { email }
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
                {/* Other form fields */}
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
