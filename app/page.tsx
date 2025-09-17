"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Github, Check } from "lucide-react"

interface ModerationResult {
  success: boolean
  level: 'safe' | 'warning' | 'danger'
  score: number
  confidence: number
  meta: {
    timestamp: string
    processingTime: number
    version: string
  }
}

export default function ModerationTestPage() {
  const [content, setContent] = useState("")
  const [result, setResult] = useState<ModerationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleModeration = async () => {
    if (!content.trim()) return

    setLoading(true)

    try {
      const response = await fetch("/api/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error("Moderation failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">ModerationAPI</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Video Demo
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                API
              </a>
            </nav>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Github className="h-4 w-4" />
              Star on GitHub
              <span className="text-red-500">♥</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-6">

              <h1 className="text-6xl font-bold text-gray-900 leading-tight">ModerationAPI</h1>

              <p className="text-xl text-gray-700 leading-relaxed">
                Detecting toxic content has always been <span className="text-red-500 font-bold">SLOW</span> and{" "}
                <span className="text-red-500 font-bold">EXPENSIVE</span>. Not anymore. Introducing a fast, free and
                open-source content moderation filter for your web apps.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-red-500" />
                <span className="text-gray-700">Much faster and cheaper to run than AI</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-red-500" />
                <span className="text-gray-700">Pretty accurate</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-red-500" />
                <span className="text-gray-700">100% free & open-source</span>
              </div>
            </div>

            {/* <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-2">
                <div key="avatar-1" className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white"></div>
                <div key="avatar-2" className="w-10 h-10 bg-green-500 rounded-full border-2 border-white"></div>
                <div key="avatar-3" className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white"></div>
                <div key="avatar-4" className="w-10 h-10 bg-yellow-500 rounded-full border-2 border-white"></div>
                <div key="avatar-5" className="w-10 h-10 bg-pink-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                ))}
              </div>
              <span className="text-gray-700 font-medium">172,080 API requests served</span>
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -top-8 -right-4 transform rotate-12">
                <span className="text-2xl text-gray-500" style={{ fontFamily: "Kalam, cursive" }}>
                  Try it
                </span>
                <div className="ml-12 -mt-2">
                  <svg width="40" height="20" viewBox="0 0 40 20" className="text-gray-400">
                    <path
                      d="M5 15 Q 20 5, 35 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 8 L35 10 L32 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="secondary" className="bg-gray-800 text-white">
                    POST
                  </Badge>
                  <span className="font-mono">https://sensetive-word-check.fly.dev/api/detect</span>
                </div>

                <Textarea
                  placeholder="this is definitely not a swear word"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-24 border-gray-200"
                />

                <Button
                  onClick={handleModeration}
                  disabled={loading || !content.trim()}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                >
                  {loading ? "Checking..." : "Moderation check"}
                </Button>

                {result && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900 mb-2">
                        {result.level === 'safe'
                          ? "Content is safe 👍"
                          : result.level === 'warning'
                          ? "Content flagged as warning ⚠️"
                          : "Content flagged as dangerous 🚫"}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Score: {result.score} (Confidence: {(result.confidence * 100).toFixed(1)}%)</div>
                        <div>Processing time: {result.meta.processingTime}ms</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="text-right text-sm text-gray-500">
              powered by <span className="font-semibold">upstash</span>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">API Documentation</h2>

            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="mt-6">
                <Card className="p-6">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`const response = await fetch('https://sensetive-word-check.fly.dev/api/detect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: '测试文本'
  })
});

const result = await response.json();
console.log(result.flagged); // true/false`}</code>
                  </pre>
                </Card>
              </TabsContent>

              <TabsContent value="python" className="mt-6">
                <Card className="p-6">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`import requests

response = requests.post('https://sensetive-word-check.fly.dev/api/detect',
    json={'text': '测试文本'})

result = response.json()
print(result['flagged'])  # True/False`}</code>
                  </pre>
                </Card>
              </TabsContent>

              <TabsContent value="curl" className="mt-6">
                <Card className="p-6">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`curl -X POST https://sensetive-word-check.fly.dev/api/detect \\
  -H "Content-Type: application/json" \\
  -d '{"text": "测试文本"}'`}</code>
                  </pre>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
