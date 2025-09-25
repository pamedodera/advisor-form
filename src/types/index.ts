export interface TabItem {
  id: string;
  label: string;
  active: boolean;
}

export interface SubNavItem {
  id: string;
  label: string;
  active: boolean;
  count?: number;
}

export interface ClauseData {
  id: string;
  title: string;
  section: string;
  definition: string;
  definitions: string;
  documentRef: string;
  version: string;
  content: string;
  isFavorite: boolean;
  isShared: boolean;
}

export interface FilterOptions {
  relevance: 'asc' | 'desc';
  searchTerm: string;
}

export interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export interface BottomAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
}

// Advisor Form Types
export interface FirmEntry {
  id: string;
  firmName: string;
  isMatched: boolean;
  contactName?: string;
  contactDesignation?: string;
  relationshipStrength?: 'very-strong' | 'strong' | 'moderate' | 'weak' | '';
  timestamp: Date;
}

export interface AdvisorFormState {
  currentStep: 'firm-input' | 'contact-details' | 'thank-you';
  currentFirmName: string;
  currentFirmMatched: boolean;
  enteredFirms: FirmEntry[];
  isFormComplete: boolean;
  maxFirms: number;
}

export interface ContactFormData {
  name: string;
  designation: string;
  relationshipStrength: 'very-strong' | 'strong' | 'moderate' | 'weak' | '';
}