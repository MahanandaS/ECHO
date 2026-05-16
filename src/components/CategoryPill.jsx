export default function CategoryPill({ children, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 text-sm font-serif-text transition ${
        active
          ? 'border-echo-light bg-echo-light text-echo-dark'
          : 'border-echo-light/20 text-echo-light/70 hover:border-echo-light/50 hover:text-echo-light'
      }`}
    >
      {children}
    </button>
  );
}
