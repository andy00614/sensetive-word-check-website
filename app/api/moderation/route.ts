import { NextRequest, NextResponse } from 'next/server'
import { evaluateContent } from '@/lib/moderation'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      )
    }

    const result = evaluateContent(content)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Moderation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
