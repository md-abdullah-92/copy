import {
  Paper,
  Title,
  Center,
  Card,
  Modal,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import ButtonPrimary from '../misc/ButtonPrimary';

export default function UpdateProfile({
  opened,
  setOpened,
  profile,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  profile: any;
}) {
  const form = useForm({
    initialValues: {
      age: profile.age || '',
      profilename: profile.name || '',
      gender: profile.gender || '',
    },
    validate: {
      age: (value) =>
        value < 18 || value > 100
          ? 'Please enter a valid age between 18 and 100'
          : null,
      profilename: (value) =>
        value.length < 2 ? 'Profile name must be at least 2 characters long' : null,
    },
  });

  const onSubmit = async (values: {
    age: number;
    profilename: string;
    gender: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
      } else {
        const res = await axios.put(
          '/api/profiles',
          {
            name: values.profilename,
            age: values.age,
            gender: values.gender,
            id: profile.id,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        window.location.href = '/profiles';
      }
    } catch (err) {
      alert('Error updating profile');
      console.log(err);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Update Profile"
    >
      <Center style={{ height: '100%' }}>
        <Card p="xl" radius="md" withBorder>
          <Title align="center" className="text-title">
            Update Profile
          </Title>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Paper p={30} mt={30} radius="md">
              <input
                type="text"
                className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                placeholder="Profile Name"
                required
                {...form.getInputProps('profilename')}
              />
              <input
                type="number"
                className="input-border-color text-color mb-4 w-full rounded-md px-3 py-2"
                placeholder="Age"
                required
                {...form.getInputProps('age')}
              />
              <Select
                placeholder="Select Gender"
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                {...form.getInputProps('gender')}
                className="mb-4"
              />
              <Center className="mt-5">
                <ButtonPrimary type="submit">Update</ButtonPrimary>
              </Center>
            </Paper>
          </form>
        </Card>
      </Center>
    </Modal>
  );
}
