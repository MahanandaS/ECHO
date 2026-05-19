import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AtmosphericBackground from '../components/AtmosphericBackground.jsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Write', href: '/create' },
];

export default function AppLayout({ children, user, onLogout, isGuest = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-echo-heading">
      <AtmosphericBackground />

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/60 backdrop-blur-md">
        <nav className="page-shell flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            to="/"
            className="font-serif-display text-2xl tracking-wide text-echo-heading transition hover:opacity-80"
            onClick={() => setMenuOpen(false)}
          >
            Echo
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {!isGuest && navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-sans text-sm transition ${
                    isActive ? 'text-echo-heading' : 'text-echo-body hover:text-echo-heading'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            {isGuest ? (
              <Link to="/login" className="btn-secondary py-2 text-xs">
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            ) : (
              user && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-white/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-echo-elevated font-serif-display text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-sans text-sm text-echo-body">{user.name}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-echo-secondary/95 p-2 shadow-2xl backdrop-blur-md">
                      <p className="px-3 py-2 font-sans text-xs text-echo-body">{user.email}</p>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-sans text-sm text-echo-body transition hover:bg-white/5 hover:text-echo-heading border-b border-white/[0.05] pb-2 mb-1"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout?.();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-sans text-sm text-echo-body transition hover:bg-white/5 hover:text-echo-heading"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <button
            type="button"
            className="text-echo-heading md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/[0.08] bg-black/90 backdrop-blur-md md:hidden">
            <div className="page-shell space-y-1 py-4">
              {!isGuest && navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 font-sans text-sm ${
                      isActive ? 'bg-white/5 text-echo-heading' : 'text-echo-body'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {user?.isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 font-sans text-sm ${
                      isActive ? 'bg-white/5 text-echo-heading' : 'text-echo-body'
                    }`
                  }
                >
                  Admin Panel
                </NavLink>
              )}
              {isGuest ? (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block rounded-lg border border-white/15 px-3 py-3 text-center font-sans text-sm"
                >
                  Sign in
                </Link>
              ) : (
                user && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                    className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-3 font-sans text-sm text-echo-body"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                )
              )}
            </div>
            </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-white/[0.08] py-12">
        <div className="page-shell flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-serif-display text-lg text-echo-heading">Echo</p>
          <p className="font-sans text-sm text-echo-body">© 2026 Echo · Thoughts in Motion</p>
        </div>
      </footer>
    </div>
  );
}
