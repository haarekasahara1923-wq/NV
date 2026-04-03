import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-heading text-foreground mb-8">Disclaimer</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground mt-8">No Guaranteed Results</h2>
            <p>Marketing results vary from client to client and depend heavily on multiple factors including total ad spend, product market fit, and external market volatility. NV Studio makes no guarantees regarding the exact number of leads or ROI.</p>

            <h2 className="text-2xl font-bold text-foreground mt-8">Platform Outages</h2>
            <p>NV Studio is not responsible for drops in performance caused by third-party outages such as Meta (Facebook/Instagram), Google Search, or WhatsApp API connectivity issues.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
