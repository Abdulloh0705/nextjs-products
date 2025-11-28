'use client'

import { useState } from "react"

export default function CounterPage() {
    const [count, setCount] = useState(0)
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Counter</h1>
            <h2 style={{ fontSize: '48px' }}> {count}</h2>
            <button onClick={() => setCount(count + 1)} style={{ padding: '10px 20px', margin: '5px', fontSize: '18px' }}>
                ➖ Kamaytirish
            </button>
            <button
                onClick={() => setCount(0)}
                style={{ padding: '10px 20px', margin: '5px', fontSize: '18px' }}
            >
                🔄 Reset
            </button>
        </div>
    )
}