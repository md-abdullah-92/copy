// hooks/useSendOtp.ts

import { useState } from 'react';
import axios from 'axios';

export const useSendOtp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const sendOtp = async (email: string, id: string) => {
        setLoading(true);
        setError(null);
        console.log("email",email);
        console.log("id",id);
        try {
            const res = await axios.put('/api/agent/sendotp',{}, { 
                params: { 
                    email, 
                    id
                 },
        })
        } catch (err) {
            setError('An error occurred while sending OTP');
        } finally {
            setLoading(false);
        }
    };

    return { sendOtp, loading, error, success };
};
