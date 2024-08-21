import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/misc/ButtonPrimary';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import getScrollAnimation from '@/utils/getScrollAnimation';

export default function AuthenticationTitle() {
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);

  const form = useForm({
    initialValues: { 
      password: '', 
      email: '', 
      name: '', 
      role: 'buyer',

    }, // Default role is 'buyer'

    validate: {
      name: (value) =>
        value.length === 0 ? 'Please fill up the field' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password not valid' : null),
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [name, email, password, role] = event.target as any;
    const values = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value, // Include the selected role
    };
    try {
      const res = await axios.post('/api/register', values);
      window.location.href = `/otp/${res.data.id}`;
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | AgriBazaar</title>
         {/* Update this line to use logo.png from assets */}
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
            paddingTop: '7rem', // Added padding for more space before the card
          }}
        >
          <ScrollAnimationWrapper>
            <motion.div
              className="mt-5 rounded-lg p-10 shadow-lg"
              style={{
                backgroundColor: '#f1faee', // Light background color for the form
                maxWidth: '500px',
                width: '100%',
              }}
              variants={scrollAnimation}
            >
              <h1 className="text-4xl font-bold text-green-900 text-center mb-6">
              Create A New Account
              </h1>
              <form onSubmit={onSubmit}>
                <div className="rounded-md p-6">
                  <label
                    className="text-color mb-2 text-sm font-semibold"
                    style={{ color: '#1d3557' }} // Darker text color
                  >
                    Username
                  </label>
                  <br />
                  <input
                    type="text"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="Your name"
                    required
                    {...form.getInputProps('username')}
                    style={{
                      borderColor: '#a8dadc',
                      backgroundColor: '#fff',
                    }}
                  />

                  <label
                    className="text-color mb-2 text-sm font-semibold"
                    style={{ color: '#1d3557' }}
                  >
                    Email
                  </label>
                  <br />
                  <input
                    type="email"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="you@gmail.com"
                    required
                    {...form.getInputProps('email')}
                    style={{
                      borderColor: '#a8dadc',
                      backgroundColor: '#fff',
                    }}
                  />

                  <label
                    className="text-color mb-2 text-sm font-semibold"
                    style={{ color: '#1d3557' }}
                  >
                    Password
                  </label>
                  <br />
                  <input
                    type="password"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="Your password"
                    required
                    {...form.getInputProps('password')}
                    style={{
                      borderColor: '#a8dadc',
                      backgroundColor: '#fff',
                    }}
                  />

                  <label
                    className="text-color mb-2 text-sm font-semibold"
                    style={{ color: '#1d3557' }}
                  >
                    Role
                  </label>
                  <br />
                  <select
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    required
                    {...form.getInputProps('role')}
                    style={{
                      borderColor: '#a8dadc',
                      backgroundColor: '#fff',
                    }}
                  >
                    <option value="buyer">Buyer</option>
                    <option value="farmer">Farmer</option>
                  </select>

                  <div className="mt-8">
                    
                      <ButtonPrimary type="submit">
                        Create
                      </ButtonPrimary>
                    
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
