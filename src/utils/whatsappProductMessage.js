const SITE_ORIGIN = 'https://atkigetir.com';

function getProductPathSegment(productLike) {
  const raw = productLike?.slug ?? productLike?.id ?? productLike?._id;
  if (raw == null || raw === '') return null;
  return encodeURIComponent(String(raw));
}

export function getProductPageUrl(productLike) {
  const seg = getProductPathSegment(productLike);
  return seg ? `${SITE_ORIGIN}/products/${seg}` : `${SITE_ORIGIN}/urunler`;
}

/**
 * Tek ürün için WhatsApp gövdesi (kart + sepet satırı ortak)
 */
export function getProductWhatsAppBodyLines(productLike, { quantity, size } = {}) {
  const name = productLike?.name || 'Ürün';
  const lines = [`"${name}" ürünü hakkında fiyat ve bilgi almak istiyorum.`];
  if (productLike?.category) lines.push(`Kategori: ${productLike.category}`);
  if (quantity != null && quantity !== '' && Number(quantity) !== 0) {
    lines.push(`Adet: ${quantity}`);
  }
  if (size) lines.push(`Beden: ${size}`);
  lines.push(`Ürün linki: ${getProductPageUrl(productLike)}`);
  return lines;
}

/**
 * Liste / kart üzerinden tek ürün
 */
export function buildProductCardWhatsAppMessage(productLike) {
  return [
    'Merhaba, ürün kartından yazıyorum.',
    '',
    ...getProductWhatsAppBodyLines(productLike),
  ].join('\n');
}

/**
 * Ürün detay sayfası (İngilizce route)
 */
export function buildProductDetailWhatsAppMessage(productLike) {
  return [
    'Merhaba, ürün detay sayfasından yazıyorum.',
    '',
    ...getProductWhatsAppBodyLines(productLike),
  ].join('\n');
}

/**
 * Sepetteki tüm kalemler — her kalem karttakiyle aynı ürün gövdesi
 */
export function buildCartWhatsAppMessage(
  cartItems,
  totalPriceLabel,
  {
    greetingLine = 'Merhaba, sepet sayfasından yazıyorum.',
    introLine = 'Sepetimdeki ürünler için fiyat ve bilgi almak istiyorum:',
  } = {}
) {
  const blocks = [];
  blocks.push(greetingLine);
  blocks.push(introLine);
  blocks.push('');

  cartItems.forEach((item, i) => {
    const body = getProductWhatsAppBodyLines(item, {
      quantity: item.quantity,
      size: item.size,
    });
    const first = body[0];
    const rest = body.slice(1);
    blocks.push(`${i + 1}) ${first}`);
    rest.forEach((line) => blocks.push(line));
    blocks.push('');
  });

  blocks.push(`Toplam sepet tutarı: ${totalPriceLabel} TL`);
  return blocks.join('\n');
}
