import { useState } from 'react'
import { Send, Shield, FileText, Paperclip, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your private AI assistant. I can help you analyze documents, answer questions, and provide insights while keeping all your data secure and GDPR compliant. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your question. Let me analyze this for you while ensuring all processing stays within your secure environment. This may take a moment...',
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AI Chat</h1>
            <p className="text-sm text-muted-foreground">
              Private, secure conversations with your AI assistant
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="privacy-indicator">
              <Shield className="h-3 w-3" />
              <span>Private Session</span>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-4xl space-y-6 p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card
                  className={`max-w-2xl ${
                    message.sender === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-card'
                  }`}
                >
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </CardContent>
                </Card>

                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 bg-muted">
                    <AvatarFallback className="text-sm">You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-3">
            <Button variant="outline" size="sm" className="shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your documents or data..."
                className="min-h-[44px] resize-none"
              />
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>All conversations are private and encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Supports document analysis</span>
              </div>
            </div>
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  )
}