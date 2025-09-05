import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AboutRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/hakkimizda');
  }, [router]);

  return null;
} 