import { LICENSE_NOTICE } from '@/utils/licenseNotice';

export default function LicenseNotice({ variant = 'banner' }) {
  if (variant === 'compact') {
    return (
      <p className="text-xs leading-relaxed text-slate-500">
        {LICENSE_NOTICE}
      </p>
    );
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-950">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs leading-relaxed sm:text-sm">
        {LICENSE_NOTICE}
      </p>
    </div>
  );
}
