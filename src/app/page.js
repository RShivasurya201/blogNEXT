import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to Seller App</h1>
      <Link href="/dashboard">
        Go to Seller Blog Dashboard
      </Link>
    </main>
  );
}
