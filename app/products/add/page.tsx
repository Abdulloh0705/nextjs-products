'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddProductPage() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                price: parseInt(price),
            }),
        })
        if (res.ok) {
            alert('Mahsulot Qo\'shildi !')
            router.push('/products')
        } else {
            alert('Xato yuz berdi')
        }
        setLoading(false)
    }
    return (
        <div style={{
            padding: '20px',
            maxWidth: '500px'
        }}>
            <h1>Yangi Mahsulot Qo'shish</h1>
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

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Saqlanmoqda...' : '✅ Saqlash'}
                </button>

                <a
                    href="/products"
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