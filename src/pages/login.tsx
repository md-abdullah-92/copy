import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
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
    initialValues: { password: '', email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password not valid' : null),
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = event.target as any;
    const values = {
      email: email.value,
      password: password.value,
    };
    try {
      const res = await axios.post('/api/login', values);
      const { token } = res.data;
      localStorage.setItem('token', token);
      window.location.href = '/profiles';
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  useEffect(() => {
    const func = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          window.location.href = '/profiles';
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
      </Head>
      <Layout>
        <div
          className="flex items-center justify-center"
          style={{
            height: '90vh',
            backgroundImage: 'url("/assets/agri_bazaar_bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#eaf4e4',
          }}
        >
          <ScrollAnimationWrapper>
            <motion.div
              className="rounded-lg p-10 shadow-lg max-w-md w-full bg-white"
              variants={scrollAnimation}
            >
              <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
                Login to AgriBazaar
              </h1>
              <p className="text-sm text-green-700 text-center mb-8">
                New to AgriBazaar?{' '}
                <button
                  className="text-orange-600 font-semibold"
                  onClick={() => router.push('/signup')}
                >
                  Create an account
                </button>
              </p>
              <form onSubmit={(values) => onSubmit(values)}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-green-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="block w-full border border-green-300 rounded-md px-4 py-2 text-green-900"
                      placeholder="you@agribazaar.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-800 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="block w-full border border-green-300 rounded-md px-4 py-2 text-green-900"
                      placeholder="Your password"
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <Center>
                      <ButtonPrimary type="submit" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
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
