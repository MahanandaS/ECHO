export default function CategoryPill({ children, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-white bg-white text-black'
          : 'border-white/10 bg-white/[0.06] text-white/72 hover:border-white/25 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
