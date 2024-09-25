import { useState } from 'react';
import BudgetForm from './components/BudgetForm';
import ItemTable from './components/ItemsTable';
import { Toaster } from './components/ui/toaster';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold ">
        Personal Budget Manager
      </h1>
      <BudgetForm onItemAdded={handleItemAdded} />
      <ItemTable key={refreshTrigger} />
      <Toaster />
    </div>
  );
};

export default App;
