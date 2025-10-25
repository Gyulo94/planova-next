import Navbar from "@/components/shared/navbar/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-accent">
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-center sticky top-0 z-40">
            <Navbar />
          </div>
          <div className="p-0 md:p-4 pt-2 min-h-[calc(100vh-64px)] xl: max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
