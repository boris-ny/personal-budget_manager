import ItemTable from '@/components/ItemTable';
import { Button } from '@/components/ui/button';
import ExpenseSummaryChart from '@/components/ExpenseSummaryChart';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useBudget } from '@/hooks/useBudget';

export const Route = createFileRoute('/expenses')({
  component: () => <Expenses />,
});

export default function Expenses() {
  const { state } = useBudget();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        <Button asChild>
          <Link to="/">Add New Item</Link>
        </Button>
      </div>

      <ItemTable />
      <div className="flex justify-between">
        <div></div>
        {state.items.length > 0 && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">View Expense Summary</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Expense Summary</DrawerTitle>
                <DrawerDescription>
                  A visual breakdown of your expenses by category.
                </DrawerDescription>
              </DrawerHeader>

              <ExpenseSummaryChart />

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-1/2 mx-auto">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
