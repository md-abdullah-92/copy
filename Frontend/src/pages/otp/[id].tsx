import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import { Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import getScrollAnimation from '@/utils/getScrollAnimation';

export default function OTP() {
  const router = useRouter();
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);

  const form = useForm({
    initialValues: {
      i1: '',
      i2: '',
      i3: '',
      i4: '',
    },
  });

  const onSubmit = async (values: { i1: string; i2: string; i3: string; i4: string }) => {
    const otp = values.i1 + values.i2 + values.i3 + values.i4;
    const { id } = router.query;
    try {
      await axios.post('/api/verify', { code: otp, id });
      window.location.href = '/login';
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  const resendCode = async () => {
    const { id } = router.query;
    try {
      await axios.post('/api/resend', { id });
      alert('Code sent');
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  return (
    <Layout>
      <div
        className="flex items-center justify-center"
        style={{
          height: '90vh',
          backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)', // Light sky gradient
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '7rem',
        }}
      >
        <ScrollAnimationWrapper>
          <motion.div
            className="mt-5 rounded-lg p-10 shadow-lg"
            style={{
              backgroundColor: '#f1faee', // Light green background color for the card view
              maxWidth: '500px',
              width: '100%',
            }}
            variants={scrollAnimation}
          >
            <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
              Email Verification
            </h1>
            <Center>
              <p className="text-gray-600 mb-4">We have sent a code to your email.</p>
            </Center>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
              <div className="flex flex-col space-y-8">
                <div className="flex w-full justify-between">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      required
                      className="input-border-color bg-white h-16 w-16 rounded-xl text-center text-lg outline-none"
                      {...form.getInputProps(`i${index + 1}`)}
                      style={{
                        borderColor: '#a8dadc',
                        backgroundColor: '#fff',
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <Center>
                    <ButtonPrimary type="submit">Verify Account</ButtonPrimary>
                  </Center>
                  <p className="text-dimmed text-sm text-center">
                    Did not receive the code?{' '}
                    <button className="text-orange-500" onClick={resendCode}>
                      Resend code
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </Layout>
  );
}
