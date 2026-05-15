import { Edit3, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AtmosphericBackground from '../components/AtmosphericBackground.jsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Feed', href: '/feed' },
  { label: 'Explore', href: '/explore' },
  { label: 'Write', href: '/create' },
];

export default function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden pb-12 text-white">
      <AtmosphericBackground />
      <header className="sticky top-4 z-40 px-4">
        <nav
          className="webcore-frame mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-sm bg-black/80 px-3 backdrop-blur-xl md:h-[70px] md:px-4"
        >
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="soft-ring grid h-11 w-11 place-items-center border border-white bg-white font-web text-lg font-black text-black">
              E
            </span>
            <span className="font-web text-lg font-black uppercase tracking-[-0.04em] text-white md:text-xl">
              ECHO <span className="hidden text-xs font-bold tracking-[0.14em] text-white/45 sm:inline">anonymous blogging site</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 border border-white/35 bg-white/[0.055] p-1 shadow-inner shadow-white/5 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-web px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition duration-300 ${
                    isActive
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'text-white/62 hover:bg-white/[0.06] hover:text-white'
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
              className="grid h-11 w-11 place-items-center border border-white/30 bg-white/[0.05] text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              aria-label="Search posts"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/create"
              className="font-web inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black shadow-lg shadow-white/10 transition duration-300 hover:scale-[1.03] hover:bg-black hover:text-white"
            >
              <Edit3 className="h-4 w-4" />
              Write
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/30 bg-white/[0.06] text-white md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="page-enter mx-auto mt-3 w-full max-w-6xl md:hidden">
              <div className="webcore-frame grid gap-2 rounded-sm bg-black/85 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-web px-4 py-3 text-xs font-black uppercase tracking-[0.16em] ${
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
