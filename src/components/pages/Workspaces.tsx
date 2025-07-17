import { useState } from 'react'
import { FolderOpen, Plus, Upload, FileText, MessageSquare, MoreVertical, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import type { Page } from '@/App'

interface WorkspacesProps {
  onNavigate: (page: Page) => void
}

interface Workspace {
  id: string
  name: string
  description: string
  documentCount: number
  lastModified: string
  isPrivate: boolean
}

export function Workspaces({ onNavigate }: WorkspacesProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Legal Documents',
      description: 'Contract analysis and legal document review',
      documentCount: 24,
      lastModified: '2 hours ago',
      isPrivate: true,
    },
    {
      id: '2',
      name: 'Financial Reports',
      description: 'Quarterly reports and financial analysis',
      documentCount: 18,
      lastModified: '1 day ago',
      isPrivate: true,
    },
    {
      id: '3',
      name: 'Market Research',
      description: 'Industry insights and market data',
      documentCount: 31,
      lastModified: '3 days ago',
      isPrivate: true,
    },
  ])

  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) return

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspaceName,
      description: newWorkspaceDescription,
      documentCount: 0,
      lastModified: 'Just now',
      isPrivate: true,
    }

    setWorkspaces(prev => [newWorkspace, ...prev])
    setNewWorkspaceName('')
    setNewWorkspaceDescription('')
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Workspaces</h1>
            <p className="text-sm text-muted-foreground">
              Organize your documents and AI conversations by project
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Workspace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Create a secure workspace for your documents and AI conversations
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input
                    id="workspace-name"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    placeholder="e.g., Legal Documents"
                  />
                </div>
                <div>
                  <Label htmlFor="workspace-description">Description (Optional)</Label>
                  <Input
                    id="workspace-description"
                    value={newWorkspaceDescription}
                    onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                    placeholder="Brief description of this workspace"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateWorkspace}>
                    Create Workspace
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          {/* Workspaces Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="group transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{workspace.name}</CardTitle>
                        {workspace.isPrivate && (
                          <div className="privacy-indicator mt-1">
                            <Shield className="h-3 w-3" />
                            <span>Private</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{workspace.description}</CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{workspace.documentCount} documents</span>
                    </div>
                    <span>Modified {workspace.lastModified}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onNavigate('chat')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Create New Workspace Card */}
            <Card className="border-dashed border-2 border-muted-foreground/25 transition-colors hover:border-muted-foreground/50">
              <CardContent className="flex h-full min-h-[200px] flex-col items-center justify-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Create Workspace</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Start a new secure workspace for your documents and AI conversations
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="mt-8 border-green-200 bg-green-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-green-800">
                  <h3 className="font-medium">Privacy & Security</h3>
                  <p className="mt-1 text-sm text-green-700">
                    All workspaces are private by default. Your documents and conversations 
                    are processed locally and never shared with external services. Full GDPR 
                    compliance is maintained across all workspaces.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}