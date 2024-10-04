import { useState } from 'react';
import { useBudget } from '@/hooks/useBudget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function CategoryManager() {
  const { state, dispatch } = useBudget();
  const [newCategory, setNewCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory.trim() });
      setNewCategory('');
      toast({
        title: 'Category added',
        description: `${newCategory.trim()} has been added to the categories.`,
      });
    }
  };

  const handleDeleteCategory = (category: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category });
    toast({
      title: 'Category deleted',
      description: `${category} has been removed from the categories.`,
      variant: 'destructive',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Categories</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Add or remove expense categories here. Deleting a category will also
            remove its budget limit and associated items.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="new-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="col-span-3"
              placeholder="New category name"
            />
            <Button onClick={handleAddCategory}>Add</Button>
          </div>
          <div className="space-y-2">
            {state.categories.map((category: string) => (
              <div key={category} className="flex justify-between items-center">
                <span>{category}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
