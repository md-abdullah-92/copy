import { useState, useEffect } from 'react';
import axios from 'axios';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;  
  division: string;
  upazila: string;
  zila: string;
}

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get<Agent[]>('/api/getagents'); // Assuming this is your agents API endpoint
        setAgents(response.data);
      } catch (err) {
        setError('Failed to fetch agents data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
};
