import { Outlet } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { APP_NAME } from '../utils/constants.js';

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-pastel-cute px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-pastel-purple text-xl font-bold text-slate-800 shadow-sm border-2 border-slate-100">
            ⭐
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            {APP_NAME} 📚
          </h1>
        </div>
        <Card>
          <Outlet />
        </Card>
      </div>
    </main>
  );
}
