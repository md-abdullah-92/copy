import { useState, useEffect } from 'react';
import axios from 'axios';

export function useOwnerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');

    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/product`, {
          params: { owneremail: email },
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchOwnerProducts();
    }
  }, []);

  return { products, loading, error };
}
