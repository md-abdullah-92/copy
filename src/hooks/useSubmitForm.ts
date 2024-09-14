import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export const useSubmitForm = (form: any) => {
  const submitForm = async (values: any) => {
    try {
      const res = await axios.post('/api/register', values);
      window.location.href = `/otp/${res.data.id}`;
    } catch (err) {
      showNotification({
        title: 'Error',
        message: 'Failed to register. Please try again.',
        color: 'red',
      });
      console.error(err);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.validate()) {
      const { name, email, password, role } = form.values;
      submitForm({ name, email, password, role });
    }
  };

  return { onSubmit };
};
