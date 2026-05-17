import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'New', href: '/' },
  { label: 'Blog', href: '/feed' },
  { label: 'Write', href: '/create' },
];

export default function AppLayout({ children, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden text-echo-light">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-echo-light/10 bg-echo-dark/50 backdrop-blur-sm">
        <nav className="page-shell flex h-16 md:h-20 items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-serif-display text-2xl tracking-wider text-echo-light hover:text-echo-light/80 transition" onClick={() => setMenuOpen(false)}>
            Echo
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-serif-text text-sm transition ${
                    isActive
                      ? 'text-echo-light border-b-2 border-echo-light pb-1'
                      : 'text-echo-light/60 hover:text-echo-light'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-echo-light/10 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-echo-green flex items-center justify-center text-xs font-serif-display text-echo-cream">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-serif-text text-echo-light/70">{user.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded bg-echo-dark border border-echo-light/20 shadow-xl">
                    <div className="border-b border-echo-light/20 px-4 py-3">
                      <p className="text-xs text-echo-light/50 tracking-wider mb-1">ACCOUNT</p>
                      <p className="text-sm font-serif-text text-echo-light">{user.name}</p>
                      <p className="text-xs text-echo-light/50 font-serif-text">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-serif-text text-echo-light/70 hover:text-echo-light hover:bg-echo-light/10 transition flex items-center gap-2 border-t border-echo-light/20"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-echo-light hover:text-echo-light/70 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-echo-light/10 bg-echo-dark/80 backdrop-blur-sm">
            <div className="page-shell py-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block font-serif-text text-sm py-2 transition ${
                      isActive
                        ? 'text-echo-light'
                        : 'text-echo-light/60 hover:text-echo-light'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              
              {user && (
                <div className="border-t border-echo-light/20 pt-4 mt-4">
                  <div className="mb-4">
                    <p className="text-xs text-echo-light/50 tracking-wider mb-2">ACCOUNT</p>
                    <p className="text-sm font-serif-text text-echo-light">{user.name}</p>
                    <p className="text-xs text-echo-light/50 font-serif-text">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-serif-text text-echo-light/70 hover:text-echo-light hover:bg-echo-light/10 transition flex items-center gap-2"
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

      {/* Main Content */}
      {children}
    </div>
  );
}
