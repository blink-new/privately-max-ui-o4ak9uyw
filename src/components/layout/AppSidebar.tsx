import { Shield, MessageSquare, Settings, FolderOpen, Home, Lock } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import type { Page } from '@/App'

interface AppSidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      page: 'dashboard' as Page,
    },
    {
      title: 'AI Chat',
      icon: MessageSquare,
      page: 'chat' as Page,
    },
    {
      title: 'Workspaces',
      icon: FolderOpen,
      page: 'workspaces' as Page,
    },
    {
      title: 'Settings',
      icon: Settings,
      page: 'settings' as Page,
    },
  ]

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">privately.max</h1>
            <div className="privacy-indicator">
              <Lock className="h-3 w-3" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.page}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.page)}
                isActive={currentPage === item.page}
                className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="text-xs text-muted-foreground">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Local Processing Active</span>
          </div>
          <p>All data stays on your premises</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}