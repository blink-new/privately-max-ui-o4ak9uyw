import { MessageSquare, FileText, Clock, Shield, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Page } from '@/App'

interface DashboardProps {
  onNavigate: (page: Page) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentDocuments = [
    { name: 'Quarterly Report Q4 2024.pdf', size: '2.4 MB', lastAccessed: '2 hours ago' },
    { name: 'Legal Contract Analysis.docx', size: '1.8 MB', lastAccessed: '1 day ago' },
    { name: 'Market Research Data.xlsx', size: '5.2 MB', lastAccessed: '3 days ago' },
    { name: 'Privacy Policy Review.pdf', size: '890 KB', lastAccessed: '1 week ago' },
  ]

  const stats = [
    { title: 'Documents Processed', value: '247', icon: FileText, change: '+12%' },
    { title: 'AI Conversations', value: '89', icon: MessageSquare, change: '+8%' },
    { title: 'Active Users', value: '23', icon: Users, change: '+15%' },
    { title: 'Privacy Score', value: '100%', icon: Shield, change: '0%' },
  ]

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back to your private AI workspace
            </p>
          </div>
          <div className="gdpr-badge">
            <Shield className="h-3 w-3" />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start a new conversation or upload documents for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button 
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Start AI Chat
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('workspaces')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Upload Documents
              </Button>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Documents you've recently analyzed with privately.max
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {doc.lastAccessed}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Status */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="h-5 w-5" />
                Privacy & Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>All processing happens locally on your infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>No data is shared with third parties</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Full GDPR compliance maintained</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>End-to-end encryption active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}