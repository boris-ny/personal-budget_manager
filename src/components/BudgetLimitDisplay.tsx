import { useBudget } from '@/context/useBudget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BudgetLimitDisplay() {
  const { state } = useBudget();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {state.budgetLimits.map((limit) => (
        <Card key={limit.category}>
          <CardHeader>
            <CardTitle className="capitalize">
              {limit.category} Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${limit.limit.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Current Limit</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
