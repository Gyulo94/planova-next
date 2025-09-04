import AppSidebar from "@/components/shared/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <div className="flex size-full">
          <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-auto">
            <AppSidebar />
          </div>
          <div className="lg:pl-[264px]">
            <div className="mx-auto nax-w-screen-2xl h-full">
              {/* Navbar */}
              <main className="h-full py-8 px-6 flex flex-col">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
