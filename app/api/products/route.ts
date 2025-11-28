import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

// GET - Barcha mahsulotlar
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' } // Eng yangilari birinchi
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}

// POST - Yangi mahsulot qo'shish
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: body.price,
        brand: body.brand || 'Unknown',
        description: body.description || '',
      },
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}       