import { MessageSquare, FileText, Clock, Shield, TrendingUp, Users, Sparkles, ArrowUpRight, Activity } from 'lucide-react'
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
    <div className="flex h-full flex-col gradient-bg">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-base text-muted-foreground">
              Welcome back to your private AI workspace
            </p>
          </div>
          <div className="gdpr-badge">
            <Shield className="h-4 w-4" />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={stat.title} className="card-hover border-0 shadow-sm bg-card/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${
                    index === 0 ? 'bg-blue-50 text-blue-600' :
                    index === 1 ? 'bg-purple-50 text-purple-600' :
                    index === 2 ? 'bg-orange-50 text-orange-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">{stat.change}</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                  <CardDescription className="text-base">
                    Start a new conversation or upload documents for analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-2 h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm"
                size="lg"
              >
                <MessageSquare className="h-4 w-4" />
                Start AI Chat
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('workspaces')}
                className="flex items-center gap-2 h-12 px-6 border-border/50 hover:bg-muted/50"
                size="lg"
              >
                <FileText className="h-4 w-4" />
                Upload Documents
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Documents</CardTitle>
                  <CardDescription className="text-base">
                    Documents you've recently analyzed with privately.max
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between rounded-xl border border-border/50 p-4 transition-all hover:bg-muted/30 hover:shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-lg group-hover:bg-accent/10 transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-accent transition-colors">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{doc.lastAccessed}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Status */}
          <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-emerald-800 font-semibold">
                    Privacy & Security Status
                  </CardTitle>
                  <CardDescription className="text-emerald-600">
                    Your data protection is our priority
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-emerald-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Local processing active</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Zero third-party sharing</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-medium">GDPR compliant</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-medium">End-to-end encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}