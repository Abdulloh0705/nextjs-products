import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bosh sahifa</h1>
      <Link href="/about">Biz haqimizda</Link>
      <br />
      <Link href='/products'> Porducts</Link>
      <br />
      <Link href="/products/1">Product 1</Link>
    </div>
  )
}