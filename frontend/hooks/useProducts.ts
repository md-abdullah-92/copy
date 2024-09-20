import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Product {
  id: number;
  productname: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: string;
  rating: number;
  ownername: string;
  ownerid: string;
}

const useProducts = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
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
