import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
