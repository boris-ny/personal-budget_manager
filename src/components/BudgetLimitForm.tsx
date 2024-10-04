'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBudget } from '@/hooks/useBudget';
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

const formSchema = z.object({
  category: z.string({
    required_error: 'Please select a category.',
  }),
  limit: z.coerce.number().positive({
    message: 'Limit must be a positive number.',
  }),
});

type BudgetLimitData = z.infer<typeof formSchema>;

export default function BudgetLimitForm() {
  const { state, dispatch } = useBudget();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<BudgetLimitData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: state.categories[0],
      limit: 0,
    },
  });
  const { toast } = useToast();

  function onSubmit(values: BudgetLimitData) {
    dispatch({ type: 'SET_BUDGET_LIMIT', payload: values });

    toast({
      title: 'Budget limit updated',
      description: `Budget limit for ${values.category} set to $${values.limit}.`,
    });

    setIsOpen(false);
  }

  function handleDelete() {
    const category = form.getValues('category');
    dispatch({ type: 'DELETE_BUDGET_LIMIT', payload: category });

    toast({
      title: 'Budget limit deleted',
      description: `Budget limit for ${category} has been removed.`,
      variant: 'destructive',
    });

    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Budget Limits</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Budget Limits</DialogTitle>
          <DialogDescription>
            Set, update, or delete budget limits for your expense categories.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {state.categories.map((category: string) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category for this budget limit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter budget limit"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set or update the budget limit for the selected category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}>
                Delete Limit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
