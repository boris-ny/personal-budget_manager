import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BudgetProvider } from '@/context/budget-context';
import ItemForm from '@/components/ItemForm';
import BudgetLimitForm from '@/components/BudgetLimitForm';
import BudgetLimitDisplay from '@/components/BudgetLimitDisplay';
import ExpenseSummaryChart from '@/components/ExpenseSummaryChart';
import { Button } from '@/components/ui/button';
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
import { Toaster } from '@/components/ui/toaster';

export const Route = createFileRoute('/')({
  component: () => <BudgetManager />,
});

export default function BudgetManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleItemAdded = () => {
    setIsDrawerOpen(true);
  };
  return (
    <BudgetProvider>
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Budget Manager</h1>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
              <div className="p-4 pb-0">
                <ExpenseSummaryChart />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <ItemForm onItemAdded={handleItemAdded} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Current Budget Limits
            </h2>
            <BudgetLimitDisplay />
            <h2 className="text-xl font-semibold my-4">Update Budget Limits</h2>
            <BudgetLimitForm />
          </div>
        </div>
      </div>
      <Toaster />
    </BudgetProvider>
  );
}
