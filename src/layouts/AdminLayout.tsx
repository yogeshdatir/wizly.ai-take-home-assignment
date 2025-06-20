import { Outlet, NavLink } from 'react-router';
import { logout } from '../utils/logout';

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden text-black dark:text-white">
      {/* Fixed-height sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-between">
        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/flow">Bot Flow</NavLink>
        </nav>

        <button
          onClick={logout}
          className="text-sm text-red-600 underline cursor-pointer"
        >
          Logout
        </button>
      </aside>

      {/* Scrollable main area */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-black p-6">
        <Outlet />
      </main>
    </div>
  );
}
