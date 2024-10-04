import { useBudget } from '@/hooks/useBudget';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export default function BudgetLimitDisplay() {
  const { state, dispatch } = useBudget();
  const { toast } = useToast();

  const handleDeleteCategory = (category: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category });
    toast({
      title: 'Category deleted',
      description: `${category} has been removed from the categories.`,
      variant: 'destructive',
    });
  };

  const getTotalExpensesForCategory = (category: string) => {
    return state.items
      .filter((item) => item.category === category)
      .reduce((total, item) => total + item.amount, 0);
  };

  return (
    <>
      {state.categories.length === 0 ? (
        <p className="text-center text-xl text-muted-foreground italic">
          Please add a category to get started.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {state.categories.map((category: string) => {
            const totalExpenses = getTotalExpensesForCategory(category);
            const budgetLimit =
              state.budgetLimits.find((limit) => limit.category === category)
                ?.limit || 0;
            const isOverBudget = totalExpenses > budgetLimit;

            return (
              <Card
                key={category}
                className={isOverBudget ? 'bg-red-500 text-white' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-xl font-bold">
                    ${totalExpenses.toFixed(2)}
                  </p>
                  <p
                    className={
                      isOverBudget
                        ? 'text-white'
                        : 'text-sm text-muted-foreground'
                    }>
                    Total Expenses
                  </p>
                  <p className="text-xl font-bold">${budgetLimit.toFixed(2)}</p>
                  <p
                    className={
                      isOverBudget
                        ? 'text-white'
                        : 'text-sm text-muted-foreground'
                    }>
                    Budget Limit
                  </p>
                </CardContent>

                <CardFooter className="flex w-full justify-end items-end">
                  <Button
                    className="ml-auto"
                    variant={isOverBudget ? 'secondary' : 'destructive'}
                    onClick={() => handleDeleteCategory(category)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
