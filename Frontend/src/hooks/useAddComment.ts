import { useState } from 'react';
import axios from 'axios';

export const useAddComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addComment = async (comment: string, username: string, userid: string, productid: string,useravatar:string,date:string,productname:string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/comments', {
        comment,
        username,
        userid,
        productid,
        useravatar,
        date,
        productname,
      });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
      setLoading(false);
    }
  };

  return { addComment, loading, error, success };
};
