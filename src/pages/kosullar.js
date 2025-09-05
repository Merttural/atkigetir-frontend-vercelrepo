import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function KosullarRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/terms');
  }, [router]);

  return null;
} 