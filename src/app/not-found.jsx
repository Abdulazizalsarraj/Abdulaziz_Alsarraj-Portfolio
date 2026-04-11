import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary gap-6 px-6">
      <div className="text-center space-y-4">
        <p className="text-8xl font-bold text-teal-400">404</p>
        <p className="text-2xl font-semibold text-white">Page Not Found</p>
        <p className="text-gray-400 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="px-8 py-3 bg-teal-400/20 border border-teal-400/40 rounded-2xl text-white font-semibold hover:bg-teal-400/30 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
