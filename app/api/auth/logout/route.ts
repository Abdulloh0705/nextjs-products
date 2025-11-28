import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Tizimdan chiqdingiz' })
  
  response.cookies.delete('user')
  
  return response
}