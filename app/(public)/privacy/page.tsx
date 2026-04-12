import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-heading text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground mt-8">Data Collection</h2>
            <p>We collect your name, email, phone number, and Marketing Executive (ME) code reference for account creation. Payment information is processed securely via Razorpay and never stored on our database.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">Third-party Integrations</h2>
            <p>Your data is synced via secure third-party platforms to ensure service delivery: Razorpay (payments), Resend (emails), and Neon (database backups). We will never sell your information to exterior entities.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">User Rights</h2>
            <p>You have the right to request full data deletion at any time by sending a written notice to support@nvstudio.wapiflow.site. All data mapped to your userId will be scrubbed from our active Postgres servers.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
