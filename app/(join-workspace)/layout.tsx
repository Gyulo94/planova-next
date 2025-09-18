export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-accent">
      {children}
    </main>
  );
}
