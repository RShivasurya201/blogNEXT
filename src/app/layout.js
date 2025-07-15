import Navbar from "@/components/Navbar";

export const metadata = {
  title: "My Next App",
  description: "Learning Next.js step by step",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: "20px" }}>
          {children}
        </main>
        <footer style={{ marginTop: "40px", padding: "10px", background: "#f0f0f0" }}>
          <p>© 2025 My Next App</p>
        </footer>
      </body>
    </html>
  );
}
