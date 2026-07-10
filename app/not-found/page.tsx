export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#0A1A3E",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{ fontSize: "4rem", fontWeight: "bold", color: "#00C2E8" }}
          >
            404
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Stranica nije pronađena
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#00C2E8",
              color: "#0A1A3E",
              borderRadius: "0.75rem",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Nazad na početnu
          </a>
        </div>
      </body>
    </html>
  );
}
