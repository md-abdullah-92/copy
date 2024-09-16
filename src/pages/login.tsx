import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import getScrollAnimation from '@/utils/getScrollAnimation';

export default function AuthenticationTitle() {
  const router = useRouter();
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);

  const form = useForm({
    initialValues: { password: '', email: '', role: 'buyer' }, // default role is set to 'buyer'
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password not valid' : null),
    },
  });

  const onSubmit = async (values: { email: string; password: string; role: string }) => {
    if(values.role==='agent')
    {
      try {
        const res = await axios.post('/api/agentlogin', values);
        const { token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', values.role);
        localStorage.setItem('email', values.email);
        //alert should more nice
        alert('Login Successful');
        window.location.href = '/agentdashboard';
      }catch (err) {
        alert('Error');
        console.log(err);
      }
    }
    else
    try {
      const res = await axios.post('/api/login', values);
      const { token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', values.role);
      localStorage.setItem('email', values.email);

      // Redirect based on the role
      if (values.role === 'buyer') {
        window.location.href = '/buyerdashboard';
      } else if (values.role === 'farmer') {
        window.location.href = '/farmerdashboard';
      }
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role'); // Get the role from localStorage
        console.log({ token, role });
        if (token) {
          if (role === 'buyer') {
            window.location.href = '/buyerdashboard';

          } else if (role === 'farmer') {
            window.location.href = '/farmerdashboard';
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  return (
    <>
      <Head>
        <title>Sign In | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div
          className="flex items-center justify-center"
          style={{
            height: '90vh',
            backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)', // Light sky gradient
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '6rem', // Added padding for more space before the card
          }}
        >
          <ScrollAnimationWrapper>
            <motion.div
              className="rounded-lg p-10 shadow-lg max-w-md w-full"
              style={{
                backgroundColor: '#f5f5f5', // Light green and white background for the card
                border: '1px solid #aed581', // Green border
              }}
              variants={scrollAnimation}
            >
              <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
                Login to AgriBazaar
              </h1>
              <p className="text-sm text-green-700 text-center mb-8">
                New to AgriBazaar?{' '}
                <button
                  className="text-orange-600 font-semibold underline"
                  onClick={() => router.push('/signup')}
                >
                  Create an account
                </button>
              </p>
              <form onSubmit={form.onSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-green-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...form.getInputProps('email')}
                      className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                      placeholder="you@agribazaar.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-900 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      {...form.getInputProps('password')}
                      className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                      placeholder="Your password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-900 mb-2">
                      Role
                    </label>
                    <select
                      {...form.getInputProps('role')}
                      className="block w-full border border-green-400 rounded-md px-4 py-2 text-green-900 focus:border-green-600 focus:ring-2 focus:ring-green-600"
                      required
                    >
                      <option value="buyer">Buyer</option>
                      <option value="farmer">Farmer</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>
                  <div className="mt-8">
                    <Center>
                      <ButtonPrimary type="submit">
                        Log in
                      </ButtonPrimary>
                    </Center>
                  </div>
                </div>
              </form>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </Layout>
    </>
  );
}
