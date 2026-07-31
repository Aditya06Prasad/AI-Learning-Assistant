import { Outlet } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { APP_NAME } from '../utils/constants.js';

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-base font-bold text-white">
            SF
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{APP_NAME}</h1>
        </div>
        <Card>
          <Outlet />
        </Card>
      </div>
    </main>
  );
}
