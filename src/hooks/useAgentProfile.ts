import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useProfile() {
  const [agentprofiles, setAgentProfiles] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({id:'', name: '', email: '', avatarurl: '', nidNumber: '' });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const getData = async () => {
        try {
          const res = await axios.get('/api/getagent', {
            headers: {
              Authorization: `${token}`,
            },
          });
          const profiles = res.data;
          console.log("profile",profiles);
          
          setAgentProfiles(profiles);
          localStorage.setItem('email', profiles.email);
          setLoggedInUser({
            id:profiles.id,
            name: profiles.name,
            email: profiles.email,
            avatarurl: profiles.avatar,
            nidNumber: profiles.nidNumber,
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

  return { agentprofiles, loggedInUser };
}
