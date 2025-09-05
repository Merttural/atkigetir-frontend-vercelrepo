import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SifremiUnuttumRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/forgot-password');
  }, [router]);

  return null;
} 