import { createFileRoute, Link } from '@tanstack/react-router';
import ItemForm from '@/components/ItemForm';
import BudgetLimitForm from '@/components/BudgetLimitForm';
import BudgetLimitDisplay from '@/components/BudgetLimitDisplay';

import CategoryManager from '@/components/CategoryManager';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: () => <BudgetManager />,
});

export default function BudgetManager() {
  return (
    <>
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Budget Manager</h1>
          <Button asChild>
            <Link to="/expenses">View Expenses</Link>
          </Button>
        </div>
        <div>
          <div className=" space-y-2 mb-4">
            <h2 className="text-xl font-semibold ">Categories</h2>
            <div className="space-x-2">
              <CategoryManager />
              <BudgetLimitForm />
            </div>
          </div>
          <BudgetLimitDisplay />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <ItemForm />
        </div>
      </div>
    </>
  );
}
