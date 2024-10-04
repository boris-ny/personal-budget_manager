import { Toaster } from '@/components/ui/toaster';
import { BudgetProvider } from '@/context/budget-context';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Budget Manager
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
      </div> */}
      <BudgetProvider>
        <Outlet />
      </BudgetProvider>
      <Toaster />
    </>
  ),
});
