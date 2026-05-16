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
            <h1 className="font-serif-display text-4xl text-echo-light mb-4">
              {mode === 'signin' ? 'Welcome' : 'Join Echo'}
            </h1>
            <p className="text-echo-light/70 font-serif-text">
              {mode === 'signin'
                ? 'Sign in to read and share essays'
                : 'Create an account to start sharing your thoughts'}
            </p>
          </div>

          <form
            onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}
            className="border border-echo-light/10 p-8"
          >
            {/* Tab Toggle */}
            <div className="mb-8 inline-flex border border-echo-light/20">
              <button
                type="button"
                onClick={() => setMode('signin')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-serif-text transition ${
                  mode === 'signin'
                    ? 'bg-echo-light text-echo-dark'
                    : 'text-echo-light/60 hover:text-echo-light'
                }`}
              >
                <LogIn className="inline h-4 w-4 mr-2" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-serif-text transition border-l border-echo-light/20 ${
                  mode === 'signup'
                    ? 'bg-echo-light text-echo-dark'
                    : 'text-echo-light/60 hover:text-echo-light'
                }`}
              >
                <UserPlus className="inline h-4 w-4 mr-2" />
                Sign Up
              </button>
            </div>

            {/* Name Field - Sign Up Only */}
            {mode === 'signup' && (
              <div className="mb-6 grid gap-2">
                <label htmlFor="name" className="text-sm font-serif-text tracking-wider text-echo-light/60">
                  FULL NAME
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text disabled:opacity-50"
                  disabled={isLoading}
                  required={mode === 'signup'}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6 grid gap-2">
              <label htmlFor="email" className="text-sm font-serif-text tracking-wider text-echo-light/60">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text disabled:opacity-50"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-8 grid gap-2">
              <label htmlFor="password" className="text-sm font-serif-text tracking-wider text-echo-light/60">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text disabled:opacity-50"
                disabled={isLoading}
                required
              />
              {mode === 'signup' && (
                <p className="text-xs text-echo-light/40 font-serif-text">Minimum 6 characters</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 border border-red-900/50 bg-red-900/10 px-4 py-3 text-sm text-red-200/70 font-serif-text">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-echo-light text-echo-dark px-6 py-3 font-serif-text transition hover:bg-echo-cream disabled:cursor-not-allowed disabled:opacity-50 mb-4"
            >
              {mode === 'signin' ? (
                <>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </>
              ) : (
                <>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
