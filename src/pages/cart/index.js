import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CartRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sepet');
  }, [router]);

  return null;
} 