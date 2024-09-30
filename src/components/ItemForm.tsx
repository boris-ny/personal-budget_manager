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
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  amount: z.coerce.number().positive({
    message: 'Amount must be a positive number.',
  }),
  category: z.enum(['food', 'utilities'], {
    required_error: 'Please select a category.',
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date.',
  }),
});

type ItemData = z.infer<typeof formSchema>;

export default function ItemForm({
  onItemAdded,
}: {
  onItemAdded?: () => void;
}) {
  const { state, dispatch } = useBudget();

  const form = useForm<ItemData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
      amount: 0,
      category: undefined,
      date: '',
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  function onSubmit(values: ItemData) {
    const newItem = { ...values, id: uuidv4() };
    dispatch({ type: 'ADD_ITEM', payload: newItem });

    toast({
      title: 'Item added successfully',
      description: `${values.itemName} (${values.category}) with amount $${values.amount} on ${values.date} has been added.`,
    });

    checkBudgetLimit(values.category, values.amount);

    form.reset();
    if (onItemAdded) {
      onItemAdded();
      navigate({ to: '/expenses' });
    }
  }

  const checkBudgetLimit = (
    category: 'food' | 'utilities' | 'transport',
    amount: number
  ) => {
    const limit = state.budgetLimits.find(
      (limit) => limit.category === category
    )?.limit;
    if (!limit) return;

    const total =
      state.items
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.amount, 0) + amount;

    if (total > limit * 0.9) {
      toast({
        title: 'Budget Alert',
        description: `You've spent $${total.toFixed(
          2
        )} on ${category}. This is ${((total / limit) * 100).toFixed(
          2
        )}% of your $${limit} budget.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the item you're adding.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormDescription>
                This is the quantity or price of the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category of the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>The date of the item entry.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Item</Button>
      </form>
    </Form>
  );
}
