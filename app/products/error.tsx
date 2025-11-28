'use client'
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div style={{ padding: '20px', border: '2px solid red' }}>
            <h2>❌ Xatolik yuz berdi!</h2>
            <p>{error.message}</p>
            <button
                onClick={reset}
                style={{ padding: '10px', cursor: 'pointer' }}
            >
                🔄 Qayta urinish
            </button>
        </div>
    )
}