import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      )
    }

    // 调用新的敏感词检测 API
    const response = await fetch('https://sensetive-word-check.fly.dev/api/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: content
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()

    // 直接返回新 API 的结果格式
    return NextResponse.json(result)

  } catch (error) {
    console.error('Moderation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}