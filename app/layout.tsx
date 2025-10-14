import { auth } from "@/auth";
import OpenProvider from "@/components/provider/open-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import QueryProvider from "@/lib/query/provider/query-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME!,
  },
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <NuqsAdapter>
              <TooltipProvider>
                {children}
                <OpenProvider />
                <Toaster />
              </TooltipProvider>
            </NuqsAdapter>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
