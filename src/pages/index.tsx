import Head from 'next/head';
import End from '../components/End';
import Start from '../components/Start';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';

export default function Home() {
 

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
          else
          window.location.href = '/agentdashboard';
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
