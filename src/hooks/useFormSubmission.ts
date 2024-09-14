import axios from 'axios';

export const useFormSubmission = (form: any) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.isValid()) return; // Ensure form validation before submit

    try {
      const res = await axios.post('/api/register', form.values);
      window.location.href = `/otp/${res.data.id}`;
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  return { handleSubmit };
};
