import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchComments = (productid: string) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('/api/comments', {
          params: { productid },
        });
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch comments');
        setLoading(false);
      }
    };

    if (productid) {
      fetchComments();
    }
  }, [productid]);

  return { comments, loading, error };
};
