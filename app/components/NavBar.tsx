'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  async function handleLogout() {
    // API ga logout so'rovi
    await fetch('/api/auth/logout', { method: 'POST' })
    
    localStorage.removeItem('user')
    setUser(null)
    alert('Tizimdan chiqdingiz')
    router.push('/')
    router.refresh()
  }
  
  return (
    <nav style={{
      padding: '15px 30px',
      backgroundColor: '#0070f3',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          Home
        </Link>
        <Link href="/products" style={{ color: 'white', textDecoration: 'none' }}>
          Mahsulotlar
        </Link>
        {user && (
          <Link href="/products/add" style={{ color: 'white', textDecoration: 'none' }}>
            ➕ Qo'shish
          </Link>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <span>👤 {user.name || user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#0070f3',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Chiqish
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Kirish
            </Link>
            <Link 
              href="/register"
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#0070f3',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              Ro'yxatdan o'tish
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
