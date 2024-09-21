import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';  // Ensure this path is correct

export const useAvatarUpload = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleAvatarChange = async (file: File | null, setFieldValue: (field: string, value: string) => void) => {
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setFieldValue('avatar', url);  // Set the uploaded URL in the form
        setAvatarPreview(url);  // Set preview to the uploaded URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return { avatarPreview, uploading, handleAvatarChange };
};
