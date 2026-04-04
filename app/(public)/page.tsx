import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-heading leading-tight">
                Grow Your Business with <span className="text-primary italic">NV Studio</span>
              </h1>
              <p className="mx-auto lg:mx-0 max-w-[600px] text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                Premium Digital Marketing, Video Production, and Automation Services in Gwalior. Accelerate your growth today.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Link href="/services">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/25 transition-all hover:scale-105">
                    View Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-14 px-8 text-lg rounded-full transition-all hover:scale-105 font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image 
                  src="/images/social-media/growth-1.jpg" 
                  alt="Social Media Growth Dashboard" 
                  width={800} 
                  height={1200} 
                  className="w-full object-cover transform transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Growth Strategy Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-slate-50">
                  <Image 
                    src="/images/social-media/social-strategy.jpg" 
                    alt="Level Up Social Media Strategy" 
                    width={600} 
                    height={800} 
                    className="w-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider uppercase">
                  Strategy First
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 leading-tight">
                  Level Up Your <span className="text-primary">Social Media</span> Presence
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  We don't just post content; we build strategies that drive real results. From data analysis to performance tracking, your brand is in expert hands.
                </p>
                <ul className="space-y-4">
                  {[
                    "Data-Driven Growth Strategies",
                    "Targeted Ad Campaigns",
                    "Competitor Analysis",
                    "ROI Focused Execution"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg text-slate-700 font-medium">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Section */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2"></div>
          <div className="container px-4 mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-wider uppercase">
                  Audience Growth
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 leading-tight">
                  Maximize <span className="text-blue-600">Engagement</span> with Organic Content
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Connect deeply with your audience through creative storytelling and community management. We help you turn followers into fans.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-3xl font-bold text-primary mb-1">12K+</div>
                    <div className="text-slate-500 font-medium">Active Followers</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">230X</div>
                    <div className="text-slate-500 font-medium">Higher Reach</div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-primary rounded-[2.5rem] opacity-20 blur-lg group-hover:opacity-30 transition"></div>
                <div className="overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white transform transition-transform group-hover:-translate-y-2 duration-500">
                  <Image 
                    src="/images/social-media/organic-engagement.jpg" 
                    alt="Maximizing Organic Engagement" 
                    width={600} 
                    height={800} 
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 font-heading text-slate-900">Why NV Studio is Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Local Expertise", desc: "Based in Gwalior, understanding the local market nuances.", icon: "📍" },
                { title: "Premium Quality", desc: "Top-tier video production and ad creatives.", icon: "✨" },
                { title: "Data-Driven", desc: "Transparent analytics and real ROI tracking.", icon: "📈" },
                { title: "Affordable", desc: "High-end marketing accessible for tier 2 & 3 cities.", icon: "💰" }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
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
