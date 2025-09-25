import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed?: boolean;
  onClose?: () => void;
}

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: string;
  isCollapsed?: boolean;
}

function NavSection({ title, children, isCollapsed }: NavSectionProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
        {title}
      </h3>
      <nav className="space-y-1">
        {children}
      </nav>
    </div>
  );
}

function NavLink({ to, children, icon, isCollapsed }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-4 focus-visible:ring-offset-2";
  const activeClasses = isActive 
    ? "bg-dark-blue-8 text-dark-blue-dark-1" 
    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  if (isCollapsed) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${activeClasses} justify-center mx-2`}
        title={typeof children === 'string' ? children : ''}
      >
        {icon && <span className="text-lg">{icon}</span>}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={`${baseClasses} ${activeClasses}`}
    >
      {icon && <span className="mr-3 text-lg">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}

function Sidebar({ isCollapsed = false, onClose }: SidebarProps) {
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-screen shadow-xl transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-dark-blue-4 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">UI</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-dark-blue-dark-4 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">UI</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">UI Kit v1</h2>
                <p className="text-xs text-gray-500">Design System</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 hover:bg-gray-100 rounded transition-colors duration-200 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-4 focus-visible:ring-offset-2"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <NavSection title="Foundation" isCollapsed={isCollapsed}>
          <NavLink 
            to="/typography" 
            icon="🔤"
            isCollapsed={isCollapsed}
          >
            Typography
          </NavLink>
          <NavLink 
            to="/colors" 
            icon="🎨"
            isCollapsed={isCollapsed}
          >
            Colors
          </NavLink>
          <NavLink 
            to="/spacing" 
            icon="📐"
            isCollapsed={isCollapsed}
          >
            Spacing
          </NavLink>
          <NavLink 
            to="/icons" 
            icon="🖼️"
            isCollapsed={isCollapsed}
          >
            Icons
          </NavLink>
        </NavSection>

        <NavSection title="Components" isCollapsed={isCollapsed}>
          <NavLink 
            to="/badges" 
            icon="🏷️"
            isCollapsed={isCollapsed}
          >
            Badges
          </NavLink>
          <NavLink 
            to="/breadcrumbs" 
            icon="🍞"
            isCollapsed={isCollapsed}
          >
            Breadcrumbs
          </NavLink>
          <NavLink 
            to="/button-groups" 
            icon="🔗"
            isCollapsed={isCollapsed}
          >
            Button Groups
          </NavLink>
          <NavLink 
            to="/buttons" 
            icon="🔘"
            isCollapsed={isCollapsed}
          >
            Buttons
          </NavLink>
          <NavLink 
            to="/checkbox" 
            icon="☑️"
            isCollapsed={isCollapsed}
          >
            Checkbox
          </NavLink>
          <NavLink 
            to="/code-block" 
            icon="💻"
            isCollapsed={isCollapsed}
          >
            Code Block
          </NavLink>
          <NavLink 
            to="/dialog" 
            icon="💬"
            isCollapsed={isCollapsed}
          >
            Dialog
          </NavLink>
          <NavLink 
            to="/definition-list" 
            icon="📋"
            isCollapsed={isCollapsed}
          >
            Definition List
          </NavLink>
          <NavLink 
            to="/disclosure" 
            icon="📂"
            isCollapsed={isCollapsed}
          >
            Disclosure
          </NavLink>
          <NavLink 
            to="/dropdown" 
            icon="📝"
            isCollapsed={isCollapsed}
          >
            Dropdown
          </NavLink>
          <NavLink 
            to="/inline-banner" 
            icon="📢"
            isCollapsed={isCollapsed}
          >
            Inline Banner
          </NavLink>
          <NavLink 
            to="/inline-message" 
            icon="💬"
            isCollapsed={isCollapsed}
          >
            Inline Message
          </NavLink>
          <NavLink 
            to="/input" 
            icon="📝"
            isCollapsed={isCollapsed}
          >
            Input
          </NavLink>
          <NavLink 
            to="/popover" 
            icon="💎"
            isCollapsed={isCollapsed}
          >
            Popover
          </NavLink>
          <NavLink 
            to="/radio-group" 
            icon="🔘"
            isCollapsed={isCollapsed}
          >
            Radio Group
          </NavLink>
          <NavLink 
            to="/select" 
            icon="📋"
            isCollapsed={isCollapsed}
          >
            Select
          </NavLink>
          <NavLink 
            to="/switch" 
            icon="🔄"
            isCollapsed={isCollapsed}
          >
            Switch
          </NavLink>
          <NavLink 
            to="/tabs" 
            icon="🗂️"
            isCollapsed={isCollapsed}
          >
            Tabs
          </NavLink>
          <NavLink 
            to="/tag" 
            icon="🏷️"
            isCollapsed={isCollapsed}
          >
            Tag
          </NavLink>
          <NavLink 
            to="/textarea" 
            icon="🔘"
            isCollapsed={isCollapsed}
          >
            Textarea
          </NavLink>
          <NavLink 
            to="/toasts" 
            icon="🔔"
            isCollapsed={isCollapsed}
          >
            Toasts
          </NavLink>
          <NavLink 
            to="/tooltip" 
            icon="🏷️"
            isCollapsed={isCollapsed}
          >
            Tooltip
          </NavLink>
          <NavLink 
            to="/loader" 
            icon="⏳"
            isCollapsed={isCollapsed}
          >
            Loader
          </NavLink>
        </NavSection>

        <NavSection title="Usage Examples" isCollapsed={isCollapsed}>
          <NavLink 
            to="/welcome" 
            icon="👋"
            isCollapsed={isCollapsed}
          >
            Welcome
          </NavLink>
          <NavLink 
            to="/document-definitions" 
            icon="📋"
            isCollapsed={isCollapsed}
          >
            Document Definitions
          </NavLink>
          <NavLink 
            to="/vault-clause-card" 
            icon="🔒"
            isCollapsed={isCollapsed}
          >
            Vault Clause Card
          </NavLink>
        </NavSection>

        {/* Spacer for future sections */}
        {!isCollapsed && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 px-3">
              More components coming soon...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        ) : (
          <div className="text-xs text-gray-500">
            <p>Built with React & TypeScript</p>
            <p className="mt-1">Styled with Tailwind CSS</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;