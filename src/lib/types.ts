import { z } from "zod";

// Define Zod schema for form validation
export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  category: z.enum(
    ['food', 'utilities', 'transportation', 'clothing', 'personal'],
    {
      message: 'Category is required',
    }
  ),
  date: z.string().min(1, { message: 'Date is required' }),
});
