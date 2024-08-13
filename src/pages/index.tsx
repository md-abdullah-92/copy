import Head from 'next/head';
import End from '../components/End';
import Start from '../components/Start';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/profiles';
    }
  }, []);

  return (
    <>
      <Head>
        <title>AgriBazaar</title>
        {/* Update this line to use logo.png from assets */}
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div>
        <Layout>
          <div style={{ backgroundColor: '#ffffff' }}>
            <Start />
            <End />
          </div>
        </Layout>
      </div>
    </>
  );
}
