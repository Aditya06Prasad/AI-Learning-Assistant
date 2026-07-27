import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
