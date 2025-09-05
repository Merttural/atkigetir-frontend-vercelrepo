import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function OdemeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/checkout');
  }, [router]);

  return null;
} 