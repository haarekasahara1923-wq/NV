'use client';
import { MessageSquare, Bot, User, Send, Settings, Terminal, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatbotPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold font-heading text-foreground uppercase">AI ChatBot Control</h1>
        <p className="text-muted-foreground mt-1 tracking-tight">Configuration and knowledge base for your AI support agent.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Preview */}
          <div className="bg-card rounded-2xl border shadow-sm flex flex-col h-[600px] overflow-hidden">
              <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <Bot className="w-6 h-6 text-primary" />
                      <div>
                          <p className="text-sm font-bold tracking-wider">AI Assistant</p>
                          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Now
                          </p>
                      </div>
                  </div>
                  <Button variant="ghost" size="icon"><Settings className="w-4 h-4" /></Button>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-muted/5">
                  <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs"><Bot className="w-4 h-4" /></div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-border">
                          Hello! How can I help you or your customers today?
                      </div>
                  </div>
                  <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs"><User className="w-4 h-4" /></div>
                      <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                          Tell me about our current services.
                      </div>
                  </div>
              </div>

              <div className="p-4 border-t bg-white flex gap-2">
                  <Input placeholder="Type a test message..." className="flex-1 border-none focus-visible:ring-0" />
                  <Button size="icon" className="shadow-lg"><Send className="w-4 h-4" /></Button>
              </div>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl border shadow-sm">
                  <h3 className="font-bold text-lg font-heading mb-4 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" /> System Configuration
                  </h3>
                  <div className="space-y-4">
                      <div className="p-3 bg-muted/30 rounded-xl flex justify-between items-center">
                          <span className="text-sm">Auto-Lead Capture</span>
                          <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded tracking-widest uppercase">Enabled</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-xl flex justify-between items-center">
                          <span className="text-sm">WhatsApp Integration</span>
                          <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded tracking-widest uppercase">Pending Setup</span>
                      </div>
                      <Button variant="outline" className="w-full text-xs">Update Knowledge Base</Button>
                  </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border shadow-sm">
                  <h3 className="font-bold text-lg font-heading mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" /> Interaction Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/10 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-bold">Today's Chats</p>
                          <p className="text-2xl font-bold font-heading">24</p>
                      </div>
                      <div className="p-4 bg-muted/10 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-bold">Leads Saved</p>
                          <p className="text-2xl font-bold font-heading">8</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
