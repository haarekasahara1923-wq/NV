import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 bg-secondary text-secondary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-black opacity-90 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white font-heading">
              Grow Your Business with <span className="text-primary">NV Studio</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl text-secondary-foreground/80 mb-8">
              Premium Digital Marketing, Video Production, and Automation Services in Gwalior. Accelerate your growth today.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105">
                  View Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-secondary-foreground/20 hover:bg-white/10 text-white h-14 px-8 text-lg rounded-full backdrop-blur transition-all hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 font-heading">Why Choose NV Studio</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Local Expertise", desc: "Based in Gwalior, understanding the local market.", icon: "📍" },
                { title: "Premium Quality", desc: "Top-tier video production and ad creatives.", icon: "✨" },
                { title: "Data-Driven", desc: "Transparent analytics and real ROI tracking.", icon: "📈" },
                { title: "Affordable", desc: "High-end marketing accessible for tier 2 & 3 cities.", icon: "💰" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
