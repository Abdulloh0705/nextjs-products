import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email allaqachon royxatdan otgan' },
        { status: 400 }
      )
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })
    
    const { password: userPassword, ...userWithoutPassword } = user
    
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}