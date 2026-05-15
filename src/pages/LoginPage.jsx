import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const user = onLogin(email, password);
      if (user) {
        navigate('/feed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="page-shell grid min-h-screen place-items-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <p className="font-web mb-4 text-xs font-black uppercase tracking-[0.28em] text-white/50">
              Welcome to blog
            </p>
            <h1 className="font-web text-balance text-4xl font-black uppercase tracking-[-0.08em] text-white">
              Sign in
            </h1>
            <p className="mt-4 text-white/58">
              Access your account to read and curate content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel rounded-[32px] p-8">
            <div className="mb-6 grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-white/28 focus:border-white/35"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-white/40">
                Demo: <span className="font-mono font-semibold">admin@blog.com</span>
              </p>
            </div>

            <div className="mb-8 grid gap-2">
              <label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-white/28 focus:border-white/35"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-white/40">
                Demo: <span className="font-mono font-semibold">admin123</span>
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 px-5 py-3 text-sm text-[#ffb3b3]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45 mb-3">
                Demo Accounts
              </p>
              <div className="space-y-2 text-xs text-white/58">
                <div>
                  <p className="font-semibold text-white/75">Admin Account</p>
                  <p>Email: <span className="font-mono">admin@blog.com</span></p>
                  <p>Password: <span className="font-mono">admin123</span></p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <p className="font-semibold text-white/75">User Account</p>
                  <p>Use any email (e.g., user@example.com) with any password</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
