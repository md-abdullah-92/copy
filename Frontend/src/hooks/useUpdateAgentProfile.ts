import axios from 'axios';
import { useForm } from '@mantine/form';

export const useUpdateProfile = (form: ReturnType<typeof useForm>) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = form.values;
    const updateRequestBody = {
      name: values.name,
      password: values.password,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      nidNumber: values.nidNumber,
      avatar: values.avatar,
      nidImage: values.nidImage,
      signatureImag: values.signatureImag,
    };
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = '/login';
        return;
      }

      const res = await axios.put('/api/agent-update', updateRequestBody, {
        headers: { 'Content-Type': 'application/json' },
        params: { email },
      });

      if (res.status === 200) {
        window.location.href = '/';
      } else {
        throw new Error(res.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: Please try again.');
    }
  };

  return { onSubmit };
};
