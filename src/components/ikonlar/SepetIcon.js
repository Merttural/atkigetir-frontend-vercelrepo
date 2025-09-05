export default function SepetIkonu({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path d="M5 6h2l2.2 10h9.5l1.8-6H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
