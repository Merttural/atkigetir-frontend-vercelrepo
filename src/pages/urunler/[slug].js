const CATEGORY_PAGES = new Set(['atki', 'bere', 'forma', 'bayrak']);

export async function getServerSideProps({ params }) {
  const raw = params?.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;

  if (!slug || /[/?#\\]/.test(slug) || CATEGORY_PAGES.has(slug)) {
    return { notFound: true };
  }

  // "Atkı".toLowerCase() atkı üretir; kategori sayfası /urunler/atki.
  if (slug === 'atkı') {
    return {
      redirect: {
        destination: '/urunler/atki',
        permanent: true,
      },
    };
  }

  return {
    redirect: {
      destination: `/products/${slug}`,
      permanent: true,
    },
  };
}

export default function UrunDetayRedirect() {
  return null;
}
