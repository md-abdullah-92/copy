import { useState } from 'react';
import axios from 'axios';
import router from 'next/router';

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const verifyOtp = async (id: string, otp: string,email:string,pathchoice:string) => {
    setLoading(true);
    setError('');
    
    try {
        const res = await axios.post('/api/agent/verifyotp',{}, { 
            params: { 
                otp, 
                id
             },
            })
        if(res.status === 201) {
            if(pathchoice=="Check Orders")
            router.push({
                pathname: '/agent-orders',
                query: { email }
              }); 
            else 
            router.push({
              pathname: '/agent-manage-products',
              query: { farmer:localStorage.getItem('name') }
            });
         
        } else {
            setError('Failed to verify OTP. Please try again later.');
        }
    
    } catch (err) {
        setError('An error occurred while sending OTP');
    } finally {
        setLoading(false);
    }
  };

  return { verifyOtp, loading, message, error };
};
