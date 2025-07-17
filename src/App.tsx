import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Dashboard } from '@/components/pages/Dashboard'
import { ChatInterface } from '@/components/pages/ChatInterface'
import { Settings } from '@/components/pages/Settings'
import { Workspaces } from '@/components/pages/Workspaces'

export type Page = 'dashboard' | 'chat' | 'settings' | 'workspaces'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />
      case 'chat':
        return <ChatInterface />
      case 'settings':
        return <Settings />
      case 'workspaces':
        return <Workspaces onNavigate={handleNavigate} />
      default:
        return <Dashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-hidden">
          {renderCurrentPage()}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App