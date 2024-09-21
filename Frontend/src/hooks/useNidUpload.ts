import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';  // Ensure this path is correct

export const useNidUpload = () => {
  const [nidPreview, setNidPreview] = useState<string | null>(null);
  const [niduploading, setNidUploading] = useState<boolean>(false);

  const handleNidChange = async (file: File | null, setFieldValue: (field: string, value: string) => void) => {
    if (file) {
      setNidUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setFieldValue('nidImage', url);  // Set the uploaded URL in the form
        setNidPreview(url);  // Set preview to the uploaded URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setNidUploading(false);
      }
    }
  };

  return { nidPreview, niduploading, handleNidChange };
};
