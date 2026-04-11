'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary gap-6 px-6">
      <div className="text-center space-y-4">
        <p className="text-3xl font-bold text-teal-400">Something went wrong</p>
        <p className="text-gray-400 max-w-sm">
          {error?.message || 'Failed to load this page. Please try again.'}
        </p>
      </div>
      <button
        className="px-8 py-3 bg-teal-400/20 border border-teal-400/40 rounded-2xl text-white font-semibold hover:bg-teal-400/30 transition-colors"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
