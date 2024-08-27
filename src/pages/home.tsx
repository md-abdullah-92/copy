import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>Welcome to Image Upload App!</h1>
      <nav>
        <ul>
          {/* Link to the Upload Image page */}
          <li><Link href="/upload">Upload Image</Link></li>
          {/* Link to the Gallery page */}
          <li><Link href="/gallery">View Gallery</Link></li>
        </ul>
      </nav>
    </main>
  );
}