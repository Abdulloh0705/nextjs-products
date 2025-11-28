import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    const user = await prisma.user.findUnique({
      where: { email },
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Email yoki parol xato' },
        { status: 401 }
      )
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email yoki parol xato' },
        { status: 401 }
      )
    }
    
    const { password: userPassword, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: 'Muvaffaqiyatli kirish',
      user: userWithoutPassword,
    })
    
    response.cookies.set('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 kun
      path: '/',
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}