import { useForm } from '@mantine/form';

export const useFormHandling = () => {
  const form = useForm({
    initialValues: {
      password: '',
      email: '',
      name: '',
      role: 'buyer', // Default role
    },
    validate: {
      name: (value) => (value.length === 0 ? 'Please fill up the field' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password not valid' : null),
    },
  });

  return form;
};
