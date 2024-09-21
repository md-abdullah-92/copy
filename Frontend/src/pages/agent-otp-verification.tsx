import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {useVerifyOtp} from '@/hooks/useVerifyOtp';
import {useRouter} from 'next/router';
import path from 'path';

export default function AgentOtpVerification() {
  const router = useRouter();
  const id=router.query.id;
  const email=router.query.email;
  const pathchoice=router.query.pathchoice;
  const [timer, setTimer] = useState(90); // 60 seconds for OTP expiration
  const [otpSent, setOtpSent] = useState(false);
  const { verifyOtp, loading, message, error } = useVerifyOtp();

  const form = useForm({
    initialValues: {
      otp: '',
      
    },
    validate: {
      otp: (value) => (value.length === 4 ? null : 'OTP must be 4 digits'),
    },
  });

  const handleResendOtp = () => {
    setTimer(60);
    setOtpSent(true);
    // Simulate OTP resend functionality (API call can be implemented here)
    console.log('OTP Resent');
  };

  const handleSubmit = (values: { otp: string }) => {
    console.log('OTP Submitted:', values.otp);
    // Handle OTP verification logic here
    verifyOtp(id as string,values.otp,email as string,pathchoice as string);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <Head>
        <title>Agent OTP Verification | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <Layout>
        <div
          className="flex items-center justify-center"
          style={{
            height: 'calc(100vh - 120px)',
            backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)',
          
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
              Agent OTP Verification
            </h1>
            <p className="text-center mb-4 text-gray-700">
              Please enter the 4-digit OTP sent to the Farmer Email.
            </p>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
                    placeholder="Enter OTP"
                    maxLength={4}
                    {...form.getInputProps('otp')}
                  />
                  {form.errors.otp && <p className="text-red-500">{form.errors.otp}</p>}
                </div>

                <div className="text-center text-gray-600 mb-2">
                  {timer > 0 ? (
                    <p>Resend OTP in {timer} seconds</p>
                  ) : (
                    <button
                      type="button"
                      className="text-blue-500 underline"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="pt-4 text-center">
                  <ButtonPrimary type="submit">Verify OTP</ButtonPrimary>
                </div>
              </div>
            </form>

            {otpSent && <p className="text-green-500 text-center mt-4">OTP has been resent!</p>}
          </div>
        </div>
      </Layout>
    </>
  );
}
