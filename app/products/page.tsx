'use client' // ⬅️ QO'SHISH KERAK!

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // User ni tekshirish
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Mahsulotlarni yuklash
    fetch('http://localhost:3000/api/products', {
      cache: 'no-store'
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <h2>Yuklanmoqda...</h2>
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mahsulotlar</h1>
      
      {/* Faqat login qilganlarga ko'rinadi */}
      {user && (
        <Link 
          href="/products/add"
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'green', 
            color: 'white',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '20px'
          }}
        >
          ➕ Yangi mahsulot qo'shish
        </Link>
      )}
      
      {products.map((product: any) => (
        <div key={product.id} style={{ 
          border: '1px solid gray', 
          padding: '10px', 
          margin: '10px' 
        }}>
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <Link href={`/products/${product.id}`}>Batafsil →</Link>
        </div>
      ))}
    </div>
  )
}