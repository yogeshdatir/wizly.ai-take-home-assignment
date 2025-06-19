import { Outlet, NavLink } from 'react-router';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <aside className="w-64 p-4 bg-gray-100 dark:bg-gray-800">
        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/flow">Bot Flow</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-white dark:bg-black">
        <Outlet />
      </main>
    </div>
  );
}
