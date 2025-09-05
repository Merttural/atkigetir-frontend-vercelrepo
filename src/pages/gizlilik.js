import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GizlilikRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/privacy');
  }, [router]);

  return null;
} 