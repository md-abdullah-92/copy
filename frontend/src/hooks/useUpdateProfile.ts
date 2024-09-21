import axios from 'axios';
import { useForm, UseFormReturnType } from '@mantine/form';

interface FormValues {
  name: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  avatar: string;
  nidNumber: string;
  nidImage: string;
  signatureImage: string;
  upazila: string;
  zila: string;
  organization: string;
}

export const useUpdateProfile = (form: UseFormReturnType<FormValues>) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const type = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    const values = form.values;

    const updateChatRequestBody = {
      id,
      name: values.name,
      avatar: values.avatar,
      type: type,
    };

    try {
      await axios.post('/api/chats/users', updateChatRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Chat profile updated successfully');
    } catch (err: any) {
      console.error('Error updating chat profile:', err);
      alert('Failed to update chat profile: Please try again.');
    }

    const updateRequestBody = {
      name: values.name,
      password: values.password,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      upazila: values.upazila,
      zila: values.zila,
      organization: values.organization,
      avatar: values.avatar,
    };

    try {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = '/login';
        return;
      }

      const res = await axios.put('/api/update', updateRequestBody, {
        headers: { 'Content-Type': 'application/json' },
        params: { email },
      });

      if (res.status === 200) {
        const role = localStorage.getItem('role');
        window.location.href = role === 'buyer' ? '/buyerdashboard' : '/farmerdashboard';
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
