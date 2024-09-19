import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { useForm } from '@mantine/form';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';  // Custom hook for avatar upload
import { useUpdateProfile } from '@/hooks/useUpdateAgentProfile';  // Custom hook for updating profile
import { useSignatureUpload } from '@/hooks/useSignatureUpload';  // Custom hook for signature upload
import { useNidUpload } from '@/hooks/useNidUpload';  // Custom hook for nid upload

export default function UpdateProfile() {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      gender: '',
      phone: '',
      address: '',
      avatar: '',
      nidNumber: '',
      nidImage: '',
      signatureImage: '',
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      password: (value) => (value ? null : 'Password is required'),
      phone: (value) =>
        /^[0-9]{10,15}$/.test(value) ? null : 'Enter a valid phone number',
      nidNumber: (value) =>
        /^[0-9]{10,17}$/.test(value) ? null : 'Enter a valid NID number',
    },
  });

  const { avatarPreview, uploading, handleAvatarChange } = useAvatarUpload();
  const { signaturePreview, signatureuploading, handleSignatureChange }= useSignatureUpload();
  const { nidPreview, niduploading, handleNidChange } = useNidUpload();
  const { onSubmit } = useUpdateProfile(form);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      if (field === 'avatar') {
        handleAvatarChange(file, form.setFieldValue);
      } else if (field === 'nidImage') {
        handleNidChange(file, form.setFieldValue);
      } else if (field === 'signatureImage') {
        handleSignatureChange(file, form.setFieldValue);
      } else {
        form.setFieldValue(field, file);
      }
    } else {
      form.setFieldError(field, 'Failed to load the file');
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
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                    placeholder="Your name"
                    required
                    {...form.getInputProps('name')}
                  />
                  {form.errors.name && <p className="text-red-500">{form.errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                    placeholder="Your password"
                    required
                    {...form.getInputProps('password')}
                  />
                  {form.errors.password && <p className="text-red-500">{form.errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                    onChange={(e) => handleFileChange(e, 'avatar')}
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
                  {form.errors.phone && <p className="text-red-500">{form.errors.phone}</p>}
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
                    Nid Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Your Nid Number"
                    {...form.getInputProps('nidNumber')}
                  />
                  {form.errors.nidNumber && <p className="text-red-500">{form.errors.nidNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#1d3557' }}>
                    Nid Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    onChange={(e) => handleFileChange(e, 'nidImage')}
                  />
                  {niduploading && <p>Uploading NID image...</p>}
                  {nidPreview && (
                    <div className="mt-4">
                      <Image
                        src={nidPreview}
                        alt="NID Preview"
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
                    Signature Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    onChange={(e) => handleFileChange(e, 'signatureImage')}
                  />
                  {signatureuploading && <p>Uploading Signature image...</p>}
                  {signaturePreview && (
                    <div className="mt-4">
                      <Image
                        src={signaturePreview}
                        alt="Signature Preview"
                        className="rounded-full"
                        height={80}
                        width={80}
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <ButtonPrimary type="submit">
                Update Profile
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
