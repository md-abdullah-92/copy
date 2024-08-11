import { Center, Badge, Text, Button, Group } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function ProfileCard({
  profile,
  setModalOpened,
}: {
  profile: any;
  setModalOpened: any;
}) {
  return (
    <div
      className="hover:cursor-pointer hover:opacity-90 transition-opacity duration-300"
      style={{
        maxWidth: '300px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#ffffff',
        marginBottom: '20px',
      }}
      onClick={() => setModalOpened(true)}
    >
      <Center className="flex-col">
        <img
          className="h-24 w-24 rounded-full border-4 border-green-600"
          src={profile.avatar ? `/avatars/${profile.avatar}.png` : '/default-avatar.png'}
          alt={`${profile.name}'s avatar`}
        />
        <h5
          className="mt-4 text-xl font-bold text-green-800"
          style={{ fontFamily: 'Caveat Brush, cursive' }}
        >
          {profile.name || 'Name not set'}
        </h5>
        <Text size="sm" color="dimmed" className="mt-1">
          {profile.location || 'Location not set'}
        </Text>
        <Badge
          color="green"
          variant="light"
          size="lg"
          className="mt-2"
        >
          {profile.expertise || 'Expertise not set'}
        </Badge>
        <Text size="sm" color="dimmed" className="mt-1">
          Products: {profile.products || '0'}
        </Text>
      </Center>
      <Group mt="md" position="apart">
        <Button
          leftIcon={<IconEdit size={16} />}
          variant="light"
          color="green"
          onClick={() => setModalOpened(true)}
        >
          Edit
        </Button>
        <Button
          leftIcon={<IconTrash size={16} />}
          variant="light"
          color="red"
        >
          Delete
        </Button>
      </Group>
    </div>
  );
}
