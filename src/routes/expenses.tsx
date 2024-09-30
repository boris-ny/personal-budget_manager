import ItemTable from '@/components/ItemTable';
import { Button } from '@/components/ui/button';
import { BudgetProvider } from '@/context/budget-context';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/expenses')({
  component: () => <Expenses />,
});

export default function Expenses() {
  return (
    <BudgetProvider>
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          <Button asChild>
            <Link to="/">Add New Item</Link>
          </Button>
        </div>

        <ItemTable />
      </div>
    </BudgetProvider>
  );
}
