import MarketingHeader from "./_components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`antialiased`}>
      <div>
        <MarketingHeader />
        {children}
      </div>
    </div>
  );
}
