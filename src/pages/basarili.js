import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BasariliRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/success');
  }, [router]);

  return null;
} 