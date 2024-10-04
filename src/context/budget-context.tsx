import React, { createContext, useReducer, useEffect } from 'react';

type Category = string;

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
  categories: Category[];
};

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'SET_BUDGET_LIMIT'; payload: BudgetLimit }
  | { type: 'DELETE_BUDGET_LIMIT'; payload: Category }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: Category }
  | { type: 'LOAD_ITEMS'; payload: Item[] }
  | { type: 'LOAD_BUDGET_LIMITS'; payload: BudgetLimit[] }
  | { type: 'LOAD_CATEGORIES'; payload: Category[] };

const initialState: State = {
  items: [],
  budgetLimits: [],
  categories: [],
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
    case 'DELETE_BUDGET_LIMIT':
      return {
        ...state,
        budgetLimits: state.budgetLimits.filter(
          (limit) => limit.category !== action.payload
        ),
      };
    case 'ADD_CATEGORY':
      if (!state.categories.includes(action.payload)) {
        return { ...state, categories: [...state.categories, action.payload] };
      }
      return state;
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category !== action.payload
        ),
        budgetLimits: state.budgetLimits.filter(
          (limit) => limit.category !== action.payload
        ),
        items: state.items.filter((item) => item.category !== action.payload),
      };
    case 'LOAD_ITEMS':
      return { ...state, items: action.payload };
    case 'LOAD_BUDGET_LIMITS':
      return { ...state, budgetLimits: action.payload };
    case 'LOAD_CATEGORIES':
      return { ...state, categories: action.payload };
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

    const storedCategories = JSON.parse(
      localStorage.getItem('categories') || '[]'
    );
    dispatch({ type: 'LOAD_CATEGORIES', payload: storedCategories });
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('budgetLimits', JSON.stringify(state.budgetLimits));
  }, [state.budgetLimits]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(state.categories));
  }, [state.categories]);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}
