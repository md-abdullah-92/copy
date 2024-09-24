import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  productid: string;
  name: string;
  image: string;
  soldprice: string;
  soldquantity: string;
  soldtime: string;
  sellername: string;
  deliverystatus: string;
}

export const usePurchasedProducts = (buyeremail: string) => {
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnerProducts = async () => {
      console.log("Buyer Email:", buyeremail);
      
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/purchased-products`, {
          params: { buyeremail },
        });

        setPurchasedProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch purchased products.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProducts();
  }, [buyeremail]);

  return { purchasedProducts, loading, error };
};
