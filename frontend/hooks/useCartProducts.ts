// src/hooks/useCartProducts.ts

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  image: string;
  productname: string;
  price: string;
  description: string;
  category: string;
  quantity: string;
}

const useCartProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get('/api/cart', {
          params: { email },
        });
        setProducts(response.data);
      } catch (err) {
        setError('We were unable to retrieve the items in your cart. Please try again later.');
        console.error('Error fetching cart products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  return { products, loading, error, setProducts };
};

export default useCartProducts;
