import Layout from '@/components/Layout/Layout';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import getScrollAnimation from '@/utils/getScrollAnimation';
import { useFormHandling } from '@/hooks/useFormHandling';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import {useSubmitForm } from '@/hooks/useSubmitForm';

export default function AuthenticationTitle() {
  const scrollAnimation = React.useMemo(() => getScrollAnimation(), []);
  const form = useFormHandling(); // Custom form handling hook
  const { handleRoleChange } = useRoleSelection(form); // Role selection hook
  const { onSubmit } = useSubmitForm(form); // Form submission hook

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
            backgroundImage: 'linear-gradient(to bottom, #e0f7fa, #b2dfdb)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '7rem',
          }}
        >
          <ScrollAnimationWrapper>
            <motion.div
              className="mt-5 rounded-lg p-10 shadow-lg"
              style={{
                backgroundColor: '#f1faee',
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
                    style={{ color: '#1d3557' }}
                  >
                    Username
                  </label>
                  <br />
                  <input
                    type="text"
                    className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                    placeholder="Your name"
                    required
                    {...form.getInputProps('name')}
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
                    onChange={handleRoleChange}
                    style={{
                      borderColor: '#a8dadc',
                      backgroundColor: '#fff',
                    }}
                  >
                    <option value="buyer">Buyer</option>
                    <option value="farmer">Farmer</option>
                    <option value="agent">Agent</option>
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
