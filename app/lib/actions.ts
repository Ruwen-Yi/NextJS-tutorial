'use server';       // all the exported functions within the file as server functions. 
                    // These server functions can then be imported into Client and Server components.
                    // React Server Actions allow you to run asynchronous code directly on the server
                    
import { z } from 'zod';

// define a schema that matches the shape of a form object
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // coerce (change) from a string to a number
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // validate FormData data type
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // convert the amount into cents to avoid 'floating-point' errors
  const amountInCents = amount * 100;
}
