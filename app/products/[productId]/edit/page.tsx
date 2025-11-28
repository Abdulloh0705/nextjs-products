'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  params: Promise<{ productId: string }>
}

export default function EditProductPage({ params }: Props) {
  const [productId, setProductId] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  
  // Ma'lumotlarni yuklash
  useEffect(() => {
    params.then(({ productId: id }) => {
      setProductId(id)
      
      fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title)
          setPrice(data.price.toString())
          setBrand(data.brand)
          setDescription(data.description)
          setLoading(false)
        })
    })
  }, [params])
  
  // Saqlash
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price: parseInt(price),
        brand,
        description,
      }),
    })
    
    if (res.ok) {
      alert('Saqlandi!')
      router.push(`/products/${productId}`)
    } else {
      alert('Xato yuz berdi')
      setSaving(false)
    }
  }
  
  if (loading) return <h2>Yuklanmoqda...</h2>
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>Mahsulotni Tahrirlash</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Nomi:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px' 
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Narxi ($):
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px' 
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Brend:
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px' 
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Ta'rif:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px' 
            }}
          />
        </div>
        
        <button 
          type="submit"
          disabled={saving}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          {saving ? 'Saqlanmoqda...' : '✅ Saqlash'}
        </button>
        
        <a 
          href={`/products/${productId}`}
          style={{ 
            marginLeft: '10px', 
            padding: '10px 20px',
            display: 'inline-block'
          }}
        >
          ❌ Bekor qilish
        </a>
      </form>
    </div>
  )
}