'use client';

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
import { useBudget } from '@/context/useBudget';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  category: z.enum(['food', 'utilities', 'transport'], {
    required_error: 'Please select a category.',
  }),
  limit: z.coerce.number().positive({
    message: 'Limit must be a positive number.',
  }),
});

type BudgetLimitData = z.infer<typeof formSchema>;

export default function BudgetLimitForm() {
  const { state, dispatch } = useBudget();

  const form = useForm<BudgetLimitData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: 'food',
      limit: 0,
    },
  });

  const { toast } = useToast();

  const watchCategory = form.watch('category');

  useEffect(() => {
    const currentLimit = state.budgetLimits.find(
      (limit) => limit.category === watchCategory
    )?.limit;
    form.setValue('limit', currentLimit || 0);
  }, [watchCategory, state.budgetLimits, form]);

  function onSubmit(values: BudgetLimitData) {
    dispatch({ type: 'SET_BUDGET_LIMIT', payload: values });

    toast({
      title: 'Budget limit updated',
      description: `Budget limit for ${values.category} set to $${values.limit}.`,
      variant: 'success',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
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
        <Button type="submit">Update Budget Limit</Button>
      </form>
    </Form>
  );
}
