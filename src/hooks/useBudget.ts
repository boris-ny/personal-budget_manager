import { useContext } from 'react';
import { BudgetContext } from '../context/budget-context';

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}

export function useUpdateBudgetLimit() {
  const { dispatch } = useBudget();

  const updateBudgetLimit = (category: string, limit: number) => {
    dispatch({ type: 'SET_BUDGET_LIMIT', payload: { category, limit } });
  };

  return updateBudgetLimit;
}