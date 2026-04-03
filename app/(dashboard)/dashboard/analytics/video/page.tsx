'use client';
import { Video, Clock, CheckCircle, AlertCircle, PlayCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  { name: 'NV Brand Promo 2024', status: 'In Review', progress: 85, date: 'Mar 28, 2024', icon: <Video className="w-6 h-6 text-blue-500" /> },
  { name: 'Product Reel Series', status: 'Planning', progress: 15, date: 'Apr 02, 2024', icon: <PlayCircle className="w-6 h-6 text-pink-500" /> },
];

export default function VideoProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">Video Projects</h1>
        <p className="text-muted-foreground mt-1">Track the status of your high-quality video productions.</p>
      </div>

      <div className="space-y-4">
          {projects.map((p, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center">
                          {p.icon}
                      </div>
                      <div>
                          <h3 className="font-bold text-lg font-heading">{p.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> Updated: {p.date}
                          </p>
                      </div>
                  </div>

                  <div className="flex-1 max-w-md">
                      <div className="flex justify-between text-xs mb-2">
                          <span className="font-medium">{p.status}</span>
                          <span className="text-muted-foreground">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${p.progress}%` }}></div>
                      </div>
                  </div>

                  <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">Preview</Button>
                      <Button variant="outline" size="sm" className="text-xs gap-1"><Download className="w-3 h-3" /> Feedback</Button>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="p-3 bg-white/10 rounded-xl">
                  <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                  <h3 className="text-xl font-bold font-heading mb-1">Need a specialized shoot?</h3>
                  <p className="text-sm text-white/70">Our team can visit your location for custom brand stories and product reviews.</p>
              </div>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-white/90">Contact Production</Button>
      </div>
    </div>
  );
}
