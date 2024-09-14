// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/getallproduct');
        setProductsData(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProducts();
  }, []);

  return { productsData, loading };
};

export default useProducts;
