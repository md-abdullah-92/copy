import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  productid: string;
  name: string;
  image: string;
  price: string;
  sellername: string;
  soldquantity: string;
  soldtime: string;
  deliverystatus: string;
  deliverytime: string;
  deliveryMethod: string;
  deliverybydate: string;
  soldprice: string;
  sellerphone: string;
  selleremail: string;
  deliverybyaddress: string;
  sellerorganization: string;
  deliverytoaddress: string;
}

export const useProductDetails = (id: string | string[] | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/soldproducts`, {
          params: { id },
        });
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return { product, loading, error };
};
