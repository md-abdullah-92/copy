import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useProfile() {
  const [profiles, setProfiles] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({ name: '', role: '', email: '', avatarurl: '',id:'' });
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
            params: { role },
          });
          const profiles = res.data;
          console.log("profile",profiles);
          localStorage.setItem('email', profiles.email);
          localStorage.setItem('name', profiles.name);
          localStorage.setItem('organization', profiles.organization);
          localStorage.setItem('upazila', profiles.upazila);
          localStorage.setItem('zila', profiles.zila);
          localStorage.setItem('division', profiles.division);
          localStorage.setItem('phone', profiles.phone);
          localStorage.setItem('id', profiles.id);
          const id=localStorage.getItem('id');
          console.log("kp",id);


          setProfiles(profiles);
          localStorage.setItem('email', profiles.email);
          setLoggedInUser({
            name: profiles.name,
            role: profiles.role,
            email: profiles.email,
            avatarurl: profiles.avatar,
            id:profiles.id  
          });
     

        } catch (err) {
          console.error('Error fetching profile data:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          router.push('/login');
        }
      };
      getData();
    }
  }, [router]);

  return { profiles, loggedInUser };
}
