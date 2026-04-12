import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Zap, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden bg-slate-50">
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-28 pb-16 md:pt-40 md:pb-32 bg-slate-900 border-b border-slate-800">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen transform translate-x-1/3 -translate-y-1/3"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen transform -translate-x-1/3 translate-y-1/3"></div>
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          </div>
          
          <div className="container px-4 md:px-8 relative z-10 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* TEXT CONTENT - ALWAYS FIRST ON MOBILE */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Zap className="w-4 h-4" /> The New Era of Digital Growth
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                  Skyrocket Your <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
                    Business Growth
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 font-medium max-w-[600px] leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  Premium digital marketing pipelines designed to generate high-quality leads, automate sales, and build an unbreakable presence.
                </p>
                
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-10 text-lg rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 w-full sm:w-auto">
                    <Link href="/services">View Services</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 h-16 px-10 text-lg rounded-2xl transition-all hover:-translate-y-1 font-bold w-full sm:w-auto">
                    <Link href="/contact">Book Strategy Call</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-6 text-sm font-bold text-slate-400 animate-in fade-in duration-1000 delay-500">
                   <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400"/> Results Guaranteed</span>
                   <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400"/> 24hr Setup</span>
                </div>
              </div>

              {/* IMAGE SECTION - BEAUTIFULLY CONTAINED */}
              <div className="w-full lg:w-1/2 relative order-2 mt-8 lg:mt-0 perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-600 rounded-[3rem] blur-2xl opacity-30 animate-pulse transition"></div>
                <div className="relative rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden bg-slate-800 transform lg:rotate-y-12 lg:-rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
                  <Image 
                    src="/images/social-media/growth-1.jpg" 
                    alt="NV Studio Dashboard" 
                    width={800} 
                    height={1000} 
                    className="w-full h-auto object-cover opacity-90 scale-105 hover:scale-100 transition-transform duration-1000"
                    priority
                  />
                  {/* Floating Glass Element */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                     </div>
                     <div>
                        <p className="text-white font-black text-lg">+340%</p>
                        <p className="text-slate-300 text-xs font-bold uppercase tracking-widest">Average ROI</p>
                     </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION SECTION */}
        <section className="py-20 md:py-32 relative z-20 -mt-10">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Targeted Advertising", desc: "Hyper-focused Meta & Google Ads that bring paying customers directly to your inbox.", icon: <Target className="w-8 h-8 text-blue-500" /> },
                { title: "Automated Funnels", desc: "We implement AI Chatbots that capture and convert your leads 24/7 without human intervention.", icon: <Zap className="w-8 h-8 text-amber-500" /> },
                { title: "Organic Dominance", desc: "Complete Social Media Management & GMB scaling to overtake your local competitors.", icon: <TrendingUp className="w-8 h-8 text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGY SPLIT SECTION */}
        <section className="py-16 md:py-32 overflow-hidden bg-white">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              
              <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
                <div className="absolute -inset-8 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50">
                  <Image 
                    src="/images/social-media/social-strategy.jpg" 
                    alt="Social Media Strategy" 
                    width={700} 
                    height={900} 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-black tracking-widest uppercase">
                  Data-Driven Execution
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                  Stop Guessing. <br/> <span className="text-primary">Start Scaling.</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                  We formulate aggressive expansion strategies using raw analytics. Your brand's growth is engineered, not accidental.
                </p>
                <div className="space-y-5 pt-4">
                  {[
                    "Uncover competitor blind spots instantly",
                    "A/B test creatives for minimal ad-spend waste",
                    "Engage directly with high-intent audience"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 w-max pr-8">
                      <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">✓</div>
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
