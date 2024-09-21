import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';  // Custom hook for avatar upload
import { useUpdateProfile } from '@/hooks/useUpdateProfile';  // Custom hook for updating profile

export default function UpdateProfile() {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      gender: '',
      phone: '',
      address: '',
      upazila: '',
      zila: '',
      divtion: '',
      organization: '',
      avatar: '',
    },
  });

  const { avatarPreview, uploading, handleAvatarChange } = useAvatarUpload();
  const { onSubmit } = useUpdateProfile(form);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    handleAvatarChange(file, form.setFieldValue);
  };

  return (
    <>
      <Head>
        <title>Update Profile | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)', backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)', paddingTop: '700px', paddingBottom: '600px' }}>
          <div className="rounded-lg p-10 shadow-lg transition-transform transform hover:scale-105" style={{ backgroundColor: '#e6f7e6', maxWidth: '500px', width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
            <h1 className="text-4xl font-bold text-green-900 text-center mb-6">Update Profile</h1>
            <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>Name</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 px-4 py-2" placeholder="Your name" required {...form.getInputProps('name')} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>Password</label>
                  <input type="password" className="w-full rounded-md border border-gray-300 px-4 py-2" placeholder="Your password" required {...form.getInputProps('password')} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>Avatar</label>
                  <input type="file" accept="image/*" className="w-full rounded-md border border-gray-300 px-4 py-2" onChange={handleFileChange} />
                  {uploading && <p>Uploading...</p>}
                  {avatarPreview && <div className="mt-4"><Image src={avatarPreview} alt="Avatar Preview" className="rounded-full" height={80} width={80} objectFit="cover" /></div>}
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
