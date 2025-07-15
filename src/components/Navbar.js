export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <a href="/" style={{ marginRight: "10px" }}>Home</a>
      <a href="/about">About</a>
      <a href="/contact" style={{ marginLeft: "10px" }}>Contact</a>
    </nav>
  );
}
