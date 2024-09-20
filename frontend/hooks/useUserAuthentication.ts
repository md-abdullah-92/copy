// src/hooks/useUserAuthentication.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useUserAuthentication = () => {
  const [loggedInUser, setLoggedInUser] = useState({ name: '', role: '', email: '', avatarurl: '' });
  const [profile, setProfiles] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.push('/login');
    } else {
      const getData = async () => {
        try {
          const res = await axios.get('/api/getone', {
            headers: {
              Authorization: `${token}`,
            },
            params: {
              role: role,
            },
          });

          localStorage.setItem('buyername', res.data.name);
          localStorage.setItem('buyeremail', res.data.email);

          setProfiles(res.data);
          setLoggedInUser({
            name: res.data.name,
            role: res.data.role,
            email: res.data.email,
            avatarurl: res.data.avatar,
          });
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          router.push('/login');
        }
      };
      getData();
    }
  }, [router]);

  return { loggedInUser, profile };
};

export default useUserAuthentication;
