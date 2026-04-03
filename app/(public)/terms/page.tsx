import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: April 2025</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Service Activation</h2>
            <p>Services confirmed are activated within 24 working hours of payment clearance. The exact deliverables and expectations will be outlined dynamically via the Client Dashboard upon activation.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Subscriptions & Refunds</h2>
            <p>Subscriptions and purchased service blocks are non-refundable after activation. We commit to the utmost quality, but do not issue refunds for time utilized by our team. You may cancel any subscription with a 15-day notice before the renewal period.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. Excluded Charges</h2>
            <p>NV Studio pricing covers agency fees, management, and strategy. Meta ad spend, Google network spend, and specific third-party platform charges (e.g. Chatbot server scaling) are strictly excluded and are to be borne by the client directly via their connected accounts.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">4. ME Commissions</h2>
            <p>Marketing Executive (ME) commissions are calculated based on realized base-fee revenue and are paid out to verified ME bank accounts within 30 days of the client's payment clearance. All commission calculations processed and noted by Admin are final.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
