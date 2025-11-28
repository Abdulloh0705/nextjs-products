'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()

        if (res.ok) {
            alert('Ro\'yxatdan o\'tdingiz!')
            router.push('/')
            window.location.reload()
        } else {
            setError(data.error || 'Xato yuz berdi')
            setLoading(false)
        }
    }

    return (
        <div style={{
            padding: '20px',
            maxWidth: '400px',
            margin: '50px auto',
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <h1>Ro'yxatdan o'tish</h1>

            {error && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#ffcccc',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Ism:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Parol:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <small style={{ color: '#666' }}>
                        Kamida 6 ta belgi
                    </small>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
                </button>
            </form>

            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Akkauntingiz bormi?{' '}
                <Link href="/login" style={{ color: '#0070f3' }}>
                    Kirish
                </Link>
            </p>
        </div>
    )
}