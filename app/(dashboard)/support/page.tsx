import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import SupportForm from '@/components/SupportForm';

export default async function SupportPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Find the registration sequence number if available, otherwise use database ID
  // For prefilled client name and ID
  const clientInfo = {
    userId: user.id.slice(-8).toUpperCase(), // Short version of ID or use user.id
    name: user.name,
    phone: user.phone
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Customer Support</h1>
        <p className="text-muted-foreground mt-1">Submit your grievance and we'll get back to you immediately.</p>
      </div>

      <SupportForm clientInfo={clientInfo} />
      
      <div className="bg-muted/50 p-6 rounded-2xl border border-dashed text-center">
        <p className="text-sm text-muted-foreground">
          Our support team is available from 10:00 AM to 7:00 PM (Mon-Sat).
        </p>
      </div>
    </div>
  );
}
