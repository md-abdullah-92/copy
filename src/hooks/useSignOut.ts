import { useRouter } from 'next/router';
import { useState } from 'react';

export function useSignOut() {
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  return { showSignOutConfirm, setShowSignOutConfirm, handleSignOut };
}
