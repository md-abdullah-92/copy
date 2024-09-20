import { useState } from 'react';
import axios from 'axios';
import { Product } from './useProducts';

export const useCart = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = async (product: Product) => {
    try {
      const response = await axios.post('/api/cart', {
        id: product.id,
        image: product.image,
        productname: product.productname,
        price: product.price,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        email: localStorage.getItem('email'),
      });
      console.log('Product added to cart:', response.data);
      setCartCount((count) => count + 1);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  return { cartCount, addToCart };
};
