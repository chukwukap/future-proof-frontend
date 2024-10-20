import MarketingHeader from "./_components/header";

export default async function MarketingLayout({
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
