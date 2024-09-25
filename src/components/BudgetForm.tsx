import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { formSchema } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const BudgetForm = ({ onItemAdded }: { onItemAdded: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      category: undefined,
      date: '',
    },
  });

  // 1. Use the useToast hook.
  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    items.push(values);
    localStorage.setItem('items', JSON.stringify(items));
    // console.log(values);
    toast({
      title: `${values.name} added`,
      variant: 'default',
    });
    form.reset();
    onItemAdded();
  }
  return (
    <main className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col  justify-center mx-auto gap-y-4">
          <div className="grid grid-cols-2 gap-10">
            {/* Name  */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of item"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Category of the Item" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transportation">Company</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Date" {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button type="submit" className="w-1/2 mx-auto mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default BudgetForm;
