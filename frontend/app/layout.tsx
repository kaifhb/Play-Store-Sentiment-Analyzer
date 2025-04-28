
import "./globals.css"; 

export const metadata = {
  title: "Play-Store Sentiment Analyzer",
  description: "Fetches recent reviews and gauges overall sentiment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
