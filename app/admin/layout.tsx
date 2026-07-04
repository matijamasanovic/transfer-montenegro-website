import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
