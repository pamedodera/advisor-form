import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

/**
 * Represents a single tab item
 */
export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Content to display when tab is active */
  content: React.ReactNode;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Optional icon to display before the label */
  beforeIcon?: React.ReactNode;
}

/**
 * Props for the Tabs component
 */
export interface TabsProps {
  /** Array of tab items to display */
  tabs: TabItem[];
  /** ID of the default active tab */
  defaultTab?: string;
  /** Callback fired when tab selection changes */
  onChange?: (tabId: string) => void;
  /** Size variant of the tabs */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant of the tabs */
  variant?: 'underline' | 'pills';
  /** Custom className for additional styling */
  className?: string;
}

/**
 * A comprehensive tabs component built on HeadlessUI with support for
 * different sizes, variants, and smooth animations
 */
export function Tabs({
  tabs,
  defaultTab,
  onChange,
  size = 'medium',
  variant = 'underline',
  className = '',
}: TabsProps) {
  // Find default tab index
  const defaultIndex = defaultTab ? tabs.findIndex(tab => tab.id === defaultTab) : 0;

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          tab: 'px-2 py-1 text-sm',
        };
      case 'large':
        return {
          tab: 'px-4 py-3 text-base',
        };
      default:
        return {
          tab: 'px-3 py-2 text-sm',
        };
    }
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return {
          tabList: 'flex space-x-1 rounded-full pb-3',
          tab: 'rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-dark-blue-0 focus:ring-offset-2',
          activeTab: 'bg-white text-dark-blue-0 shadow-sm',
          inactiveTab: 'text-night-sky-blue-0 hover:text-neutral-0 hover:bg-night-sky-blue-5'
        };
      default: // underline
        return {
          tabList: 'flex border-b border-night-sky-blue-3',
          tab: 'border-b-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-blue-0 focus:ring-offset-2',
          activeTab: 'text-dark-blue-0 border-dark-blue-0 font-medium',
          inactiveTab: 'border-transparent text-night-sky-blue-0 hover:text-neutral-0 hover:border-night-sky-blue-2'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  // Handle tab change
  const handleTabChange = (index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab && onChange) {
      onChange(selectedTab.id);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <TabGroup defaultIndex={defaultIndex} onChange={handleTabChange}>
        <TabList className={variantClasses.tabList}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              disabled={tab.disabled}
              className={({ selected }) => {
                const baseClasses = `${sizeClasses.tab} ${variantClasses.tab}`;
                const stateClasses = selected 
                  ? variantClasses.activeTab 
                  : variantClasses.inactiveTab;
                const disabledClasses = tab.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer';
                
                return `${baseClasses} ${stateClasses} ${disabledClasses}`;
              }}
            >
              <div className="flex items-center gap-2">
                {tab.beforeIcon && <span className="flex-shrink-0">{tab.beforeIcon}</span>}
                <span>{tab.label}</span>
              </div>
            </Tab>
          ))}
        </TabList>
        
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel
              key={tab.id}
              className={`focus:outline-none transition-opacity duration-200`}
            >
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default Tabs;