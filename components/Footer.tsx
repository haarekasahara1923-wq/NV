import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold font-heading text-primary mb-4">NV Studio</h3>
          <p className="text-sm text-secondary-foreground/80 mb-4">
            A Unit of Shree Shyam Tech.<br />
            Grow Digital. Grow Real.<br />
            Morar, Gwalior, MP - 474006
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/signup" className="hover:text-primary transition-colors">Join as ME</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li>Email: support@nvstudio.wapiflow.site</li>
            <li>Phone: +91 9457440300</li>
            <li>Location: Gwalior, Madhya Pradesh</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
        © {new Date().getFullYear()} NV Studio. All rights reserved.
      </div>
    </footer>
  );
}
