// src/hooks/useRemoveProduct.ts

import axios from 'axios';

const useRemoveProduct = (setProducts: React.Dispatch<React.SetStateAction<any[]>>) => {
  const removeProduct = async (productId: string) => {
    try {
      const email = localStorage.getItem('email'); // Fetch email from local storage
      const response = await axios.post('/api/removecart', {
        email,
        id: productId,
      });
      alert('Product removed from cart');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      console.log('Product removed:', response.data);
    } catch (err) {
      console.error('Error removing product:', err);
    }
  };

  return removeProduct;
};

export default useRemoveProduct;
