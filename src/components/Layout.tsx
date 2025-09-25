import { useState } from 'react';
import Sidebar from './Sidebar';
import { ErrorBoundary } from 'react-error-boundary';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 relative">
      {/* Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-dark-blue-0 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:no-underline"
      >
        Skip to main content
      </a>
      {/* Invisible overlay - Click outside to close */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Floating Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <Sidebar isCollapsed={false} onClose={toggleSidebar} />
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-4 z-40 w-10 h-10 bg-white border border-gray-300 rounded shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-0 focus-visible:ring-offset-2"
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isSidebarOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Main Content Area - Full Width */}
      <main 
        id="main-content"
        className="h-full overflow-auto"
        aria-label="Main content"
      >
        <div className="h-full">
          <ErrorBoundary fallback={<div className="text-2xl text-center mx-auto">Something went wrong, but Pam is already working on it! 👩‍🎨</div>}>
          {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default Layout;