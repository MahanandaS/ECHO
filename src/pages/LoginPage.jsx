import { LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

export default function LoginPage({ onLogin, onSignup }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      onLogin(email, password);
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      onSignup(email, password, name);
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setEmail('');
    setPassword('');
    setName('');
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
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="mt-4 text-white/58">
              {mode === 'signin'
                ? 'Access your account to read and share stories'
                : 'Join our blogging community'}
            </p>
          </div>

          <form
            onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}
            className="glass-panel rounded-[32px] p-8"
          >
            {/* Tab Toggle */}
            <div className="mb-8 inline-flex rounded-full border border-white/10 bg-black/20 p-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === 'signin'
                    ? 'bg-white text-black'
                    : 'text-white/58 hover:text-white'
                }`}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === 'signup'
                    ? 'bg-white text-black'
                    : 'text-white/58 hover:text-white'
                }`}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </button>
            </div>

            {/* Name Field - Sign Up Only */}
            {mode === 'signup' && (
              <div className="mb-6 grid gap-2">
                <label htmlFor="name" className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-white/28 focus:border-white/35 disabled:opacity-50"
                  disabled={isLoading}
                  required={mode === 'signup'}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6 grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-white/28 focus:border-white/35 disabled:opacity-50"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Field */}
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
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-white/28 focus:border-white/35 disabled:opacity-50"
                disabled={isLoading}
                required
              />
              {mode === 'signup' && (
                <p className="text-xs text-white/40">Minimum 6 characters</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 px-5 py-3 text-sm text-[#ffb3b3]">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mode === 'signin' ? (
                <>
                  <LogIn className="h-4 w-4" />
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </>
              )}
            </button>

            {/* Info Box */}
            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45 mb-3">
                {mode === 'signin' ? 'Demo Account' : 'Demo Credentials'}
              </p>
              <div className="space-y-2 text-xs text-white/58">
                <div>
                  <p className="font-semibold text-white/75">Admin Account</p>
                  <p>Email: <span className="font-mono">admin@blog.com</span></p>
                  <p>Password: <span className="font-mono">admin123</span></p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <p className="font-semibold text-white/75">
                    {mode === 'signin' ? 'New Here?' : 'Already have an account?'}
                  </p>
                  <p>
                    {mode === 'signin'
                      ? 'Click the Sign Up tab to create a new account'
                      : 'Click the Sign In tab to log in'}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
