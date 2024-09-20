import axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface FormValues {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const useSubmitForm = (form: any) => {
  const handleFormSubmission = async (url: string, values: FormValues) => {
    try {
      const res = await axios.post(url, values);

      if(values.role === 'agent'){
        console.log('Agent registration');
         console.log('id in id 1', res.data.id);
        window.location.href = `/otp/agents/${res.data.id}`;
      }
      else
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

      // Debugging Log
      console.log('Form Values:', { name, email, password, role });

      if (role === 'agent') {
        console.log('Agent registration');
        
        handleFormSubmission('/api/agent-register', { name, email, password,role });
      } else {
        console.log('Regular registration');
        
        handleFormSubmission('/api/register', { name, email, password, role });
       
      }
    }
  };

  return { onSubmit };
};
