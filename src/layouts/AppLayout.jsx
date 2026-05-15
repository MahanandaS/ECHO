import { Edit3, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Feed', href: '/feed' },
  { label: 'Explore', href: '/explore' },
  { label: 'Write', href: '/create' },
];

export default function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-12 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050507]/72 backdrop-blur-2xl">
        <nav className="page-shell flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-lg font-black text-black">
              E
            </span>
            <span className="text-xl font-semibold tracking-tight">Echo</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-white text-black' : 'text-white/68 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/feed"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-white/20 hover:text-white"
              aria-label="Search posts"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.03]"
            >
              <Edit3 className="h-4 w-4" />
              Write
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="page-shell pb-5 md:hidden">
            <div className="grid gap-2 rounded-3xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-medium ${
                      isActive ? 'bg-white text-black' : 'text-white/72'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {children}

      <Link
        to="/create"
        className="fixed bottom-6 right-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-2xl shadow-black/40 transition hover:scale-105 md:hidden"
        aria-label="Create post"
      >
        <Edit3 className="h-5 w-5" />
      </Link>
    </div>
  );
}
