import { Edit3, Menu, Search, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AtmosphericBackground from '../components/AtmosphericBackground.jsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Feed', href: '/feed' },
  { label: 'Explore', href: '/explore' },
  { label: 'Write', href: '/create' },
];

export default function AppLayout({ children, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
              BLOG <span className="hidden text-xs font-bold tracking-[0.14em] text-white/45 sm:inline">create & share stories</span>
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
            
            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.05] px-3 py-2 text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${
                    user.isAdmin ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black' : 'bg-white text-black'
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold">{user.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-[24px] border border-white/10 bg-black/95 p-2 shadow-xl shadow-black/50 backdrop-blur-xl">
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.12em]">Account</p>
                      <p className="mt-1 text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-white/45">{user.email}</p>
                      {user.isAdmin && (
                        <p className="mt-2 inline-block rounded-full bg-gradient-to-r from-amber-900/80 to-amber-800/80 px-2 py-1 text-xs font-bold text-amber-200">
                          Admin
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-3 text-left text-xs font-semibold text-white/70 hover:text-white flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
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
              
              {user && (
                <div className="border-t border-white/10 pt-2 mt-2">
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.12em]">Account</p>
                    <p className="mt-1 text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/45">{user.email}</p>
                    {user.isAdmin && (
                      <p className="mt-2 inline-block rounded-full bg-gradient-to-r from-amber-900/80 to-amber-800/80 px-2 py-1 text-xs font-bold text-amber-200">
                        Admin
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-xs font-semibold text-white/70 hover:text-white flex items-center gap-2 hover:bg-white/[0.05]"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
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
