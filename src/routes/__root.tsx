import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Budget Manager
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
