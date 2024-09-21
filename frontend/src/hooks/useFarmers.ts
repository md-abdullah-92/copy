import { useState, useEffect } from 'react';
import axios from 'axios';

interface Farmer {
  id: string;
  name: string;
  email: string;
  upazila: string;
  zila:string;
  division:string;
  phone: string;
  avatar: string;
  organization: string;
}

export const useFarmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get<Farmer[]>('/api/getfarmers');
        setFarmers(response.data);
      } catch (err) {
        setError('Failed to fetch farmers data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return { farmers, loading, error };
};
