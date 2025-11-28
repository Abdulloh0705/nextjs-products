'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  params: Promise<{ productId: string }>
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [productId, setProductId] = useState('')
  const [user, setUser] = useState<any>(null) // ⬅️ YANGI!
  const router = useRouter()
  
  useEffect(() => {
    // User ni tekshirish ⬅️ YANGI!
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    params.then(({ productId: id }) => {
      setProductId(id)
      
      fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          setLoading(false)
        })
    })
  }, [params])
  
  async function handleDelete() {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      return
    }
    
    setDeleting(true)
    
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'DELETE',
    })
    
    if (res.ok) {
      alert('O\'chirildi!')
      router.push('/products')
    } else {
      alert('Xato yuz berdi')
      setDeleting(false)
    }
  }
  
  if (loading) return <h2>Yuklanmoqda...</h2>
  if (!product) return <h2>Mahsulot topilmadi</h2>
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <p><strong>Narxi:</strong> ${product.price}</p>
      <p><strong>Brend:</strong> {product.brand}</p>
      <p><strong>Ta'rif:</strong> {product.description}</p>
      <p><strong>Reyting:</strong> ⭐ {product.rating}</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/products">← Orqaga</Link>
        
        {/* Faqat login qilgan userga ko'rinadi ⬅️ YANGI! */}
        {user && (
          <>
            <Link
              href={`/products/${productId}/edit`}
              style={{
                marginLeft: '20px',
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              ✏️ Tahrirlash
            </Link>
            
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                marginLeft: '10px',
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: deleting ? 'not-allowed' : 'pointer'
              }}
            >
              {deleting ? 'O\'chirilmoqda...' : '🗑️ O\'chirish'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}