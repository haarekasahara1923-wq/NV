import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-8 text-center">About NV Studio</h1>
          
          <div className="bg-card p-10 rounded-2xl border shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-4">A Unit of Shree Shyam Tech</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              NV Studio is a premier digital marketing agency based in Morar, Gwalior, Madhya Pradesh. We specialize in helping businesses transition and grow online through professional video production, comprehensive social media management, targeted paid advertising, and smart digital automation tools.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-3">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our mission is to make premium digital marketing affordable and accessible for every business in India — especially focusing on empowering brands in Tier 2 & Tier 3 cities.
            </p>

            <div className="bg-secondary/5 rounded-xl p-6 mt-8 border border-secondary/10 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center font-heading font-bold text-2xl shrink-0">
                NV
              </div>
              <div>
                <p className="font-bold text-lg">Founded by: Shyam</p>
                <p className="text-muted-foreground mt-1">Location: Morar, Gwalior, MP — 474006</p>
                <p className="text-primary font-medium mt-2">"Grow Digital. Grow Real."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
