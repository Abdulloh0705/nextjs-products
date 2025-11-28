import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

// GET - Bitta mahsulot
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Mahsulot topilmadi' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        price: body.price,
        brand: body.brand,
        description: body.description
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}


// DELETE - Mahsulotni o'chirish
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.product.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'O\'chirildi' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Mahsulot topilmadi' },
      { status: 404 }
    )
  }
}