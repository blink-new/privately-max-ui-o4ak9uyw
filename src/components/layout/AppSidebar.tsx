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
    <Sidebar className="border-r border-sidebar-border bg-sidebar shadow-lg">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-sm">
            <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">privately.max</h1>
            <div className="privacy-indicator">
              <Lock className="h-3 w-3" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-6">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.page}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.page)}
                isActive={currentPage === item.page}
                className="w-full justify-start gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-sidebar-accent/50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm font-medium text-sidebar-foreground">Local Processing Active</span>
          </div>
          <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
            All data stays on your premises. Zero third-party access.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}