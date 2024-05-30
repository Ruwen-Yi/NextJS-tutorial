import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
// notFound function is called to present a fallback UI (eg., 404 not found)
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // read the invoice `id` from page params
  const id = params.id;
  
  // fetch both the invoice and customers in parallel
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // throw an error, rendering the fallback UI (not-found.tsx) if any
  // otherwise render a 'something went wrong' page
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />

      {/* The form should be pre-populated with a defaultValue for the customer's name, invoice amount, and status. */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}