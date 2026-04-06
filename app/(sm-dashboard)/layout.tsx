import SMDashboardSidebar from '@/components/SMDashboardSidebar';

export default function SMDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <SMDashboardSidebar />
      <main className="flex-1 p-8 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
