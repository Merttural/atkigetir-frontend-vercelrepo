import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UrunDetayRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/products/${slug}`);
    }
  }, [router, slug]);

  return null;
} 