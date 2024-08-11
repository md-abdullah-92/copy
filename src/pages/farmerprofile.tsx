import { useState } from 'react';
import { Container, Paper, Title, TextInput, Textarea, Button, Center, Avatar, Stack, Loader, Group, Box } from '@mantine/core';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import { useForm } from '@mantine/form';

export default function FarmerProfile() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      farmName: 'Sunny Farms',
      bio: 'A dedicated farmer with a passion for sustainable agriculture. We grow a variety of organic vegetables and fruits.',
      phone: '123-456-7890',
      address: '123 Farm Road, Agriville, AG 45678',
    },

    validate: {
      name: (value) => (value.length === 0 ? 'Name is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate a server request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Farmer Profile | AgriBazaar</title>
      </Head>
      <Layout>
        <Container fluid style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Paper padding="lg" radius="md" shadow="md" style={{ maxWidth: 900, margin: 'auto', backgroundColor: '#ffffff' }}>
            <Group position="center" mb="lg">
              <Avatar size={120} src="/assets/farmer-avatar.png" alt="Farmer Avatar" />
            </Group>
            <Title order={2} align="center" mb="lg" color="green.700">
              Farmer Profile
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack spacing="md">
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  required
                  {...form.getInputProps('name')}
                  radius="md"
                  size="md"
                />
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="you@agribazaar.com"
                  required
                  {...form.getInputProps('email')}
                  radius="md"
                  size="md"
                />
                <TextInput
                  label="Phone"
                  placeholder="Your phone number"
                  {...form.getInputProps('phone')}
                  radius="md"
                  size="md"
                />
                <TextInput
                  label="Farm Name"
                  placeholder="Your farm name"
                  {...form.getInputProps('farmName')}
                  radius="md"
                  size="md"
                />
                <Textarea
                  label="Bio"
                  placeholder="A short description about you and your farm"
                  {...form.getInputProps('bio')}
                  radius="md"
                  size="md"
                  minRows={4}
                />
                <TextInput
                  label="Address"
                  placeholder="Your address"
                  {...form.getInputProps('address')}
                  radius="md"
                  size="md"
                />
                <Center mt="lg">
                  <Button type="submit" color="green" radius="md" size="lg">
                    Save Changes
                  </Button>
                </Center>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Layout>
    </>
  );
}
