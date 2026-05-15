import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="grid min-h-screen place-items-center px-6 text-center text-white">
          <div className="glass-panel max-w-xl rounded-[28px] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ff6b6b]">
              Blog could not render
            </p>
            <h1 className="mt-4 text-3xl font-semibold">Something stopped the app.</h1>
            <p className="mt-4 text-white/62">
              Check the browser console for the exact message. The most common fix is to run
              `npm install` and then `npm run dev`.
            </p>
            <pre className="mt-5 overflow-auto rounded-2xl bg-black/40 p-4 text-left text-xs text-white/70">
              {this.state.error.message}
            </pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
