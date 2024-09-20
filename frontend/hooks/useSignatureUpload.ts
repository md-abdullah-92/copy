import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';  // Ensure this path is correct

export const useSignatureUpload = () => {
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [signatureuploading, setSignatureUploading] = useState<boolean>(false);

  const handleSignatureChange = async (file: File | null, setFieldValue: (field: string, value: string) => void) => {
    if (file) {
      setSignatureUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setFieldValue('signatureImage', url);  // Set the uploaded URL in the form
        setSignaturePreview(url);  // Set preview to the uploaded URL
      } catch (error) {
        console.error('Error uploading the file', error);
      } finally {
        setSignatureUploading(false);
      }
    }
  };

  return { signaturePreview, signatureuploading, handleSignatureChange };
};
