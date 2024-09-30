import React, { createContext, useReducer, useEffect } from 'react';

type Category = 'food' | 'utilities' | 'transport';

type Item = {
  id: string;
  itemName: string;
  amount: number;
  category: Category;
  date: string;
};

type BudgetLimit = {
  category: Category;
  limit: number;
};

type State = {
  items: Item[];
  budgetLimits: BudgetLimit[];
};

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'SET_BUDGET_LIMIT'; payload: BudgetLimit }
  | { type: 'LOAD_ITEMS'; payload: Item[] }
  | { type: 'LOAD_BUDGET_LIMITS'; payload: BudgetLimit[] };

const initialState: State = {
  items: [],
  budgetLimits: [],
};

function budgetReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'SET_BUDGET_LIMIT': {
      const existingLimitIndex = state.budgetLimits.findIndex(
        (limit) => limit.category === action.payload.category
      );
      if (existingLimitIndex !== -1) {
        const newLimits = [...state.budgetLimits];
        newLimits[existingLimitIndex] = action.payload;
        return { ...state, budgetLimits: newLimits };
      }
      return {
        ...state,
        budgetLimits: [...state.budgetLimits, action.payload],
      };
    }
    case 'LOAD_ITEMS':
      return { ...state, items: action.payload };
    case 'LOAD_BUDGET_LIMITS':
      return { ...state, budgetLimits: action.payload };
    default:
      return state;
  }
}

export const BudgetContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    dispatch({ type: 'LOAD_ITEMS', payload: storedItems });

    const storedLimits = JSON.parse(
      localStorage.getItem('budgetLimits') || '[]'
    );
    dispatch({ type: 'LOAD_BUDGET_LIMITS', payload: storedLimits });
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('budgetLimits', JSON.stringify(state.budgetLimits));
  }, [state.budgetLimits]);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}
