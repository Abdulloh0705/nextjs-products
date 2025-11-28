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
      <h2>❌ Mahsulot yuklanmadi</h2>
      <p>{error.message}</p>
      <button onClick={reset}>🔄 Qayta urinish</button>
      <br /><br />
      <a href="/products">← Ortga qaytish</a>
    </div>
  )
}