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
    <div className="flex h-full flex-col gradient-bg">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">AI Chat</h1>
            <p className="text-base text-muted-foreground">
              Private, secure conversations with your AI assistant
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="privacy-indicator">
              <Shield className="h-4 w-4" />
              <span>Private Session</span>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-muted/50">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-4xl space-y-8 p-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-accent to-accent/80 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground text-sm font-medium">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card
                  className={`max-w-2xl shadow-sm border-0 ${
                    message.sender === 'user'
                      ? 'bg-accent/90 text-accent-foreground backdrop-blur-sm'
                      : 'bg-card/80 backdrop-blur-sm'
                  }`}
                >
                  <CardContent className="p-5">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </CardContent>
                </Card>

                {message.sender === 'user' && (
                  <Avatar className="h-10 w-10 bg-muted shadow-sm">
                    <AvatarFallback className="text-sm font-medium">You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-card/80 backdrop-blur-sm p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-4">
            <Button variant="outline" size="sm" className="shrink-0 h-12 w-12 border-border/50 hover:bg-muted/50">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your documents or data..."
                className="min-h-[48px] resize-none border-border/50 bg-background/50 backdrop-blur-sm text-base px-4 py-3 focus:ring-2 focus:ring-accent/20"
              />
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="shrink-0 h-12 w-12 bg-accent hover:bg-accent/90 shadow-sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span>All conversations are private and encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                <span>Supports document analysis</span>
              </div>
            </div>
            <span className="text-xs">Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  )
}