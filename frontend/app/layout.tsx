import "@/styles/globals.css";

export const metadata = {
  title: "Coding Agent",
  description: "Cursor-like AI Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-app text-white">
        <div className="h-screen flex">{children}</div>
      </body>
    </html>
  );
}