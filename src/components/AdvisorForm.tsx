import { useState, useCallback } from 'react';
import type { AdvisorFormState, FirmEntry, ContactFormData } from '../types';
import { FirmService } from '../services/FirmService';
import FirmInputStep from './FirmInputStep';
import ContactDetailsStep from './ContactDetailsStep';
import ThankYouStep from './ThankYouStep';
import FormCompleteStep from './FormCompleteStep';
import ErrorBoundary from './ErrorBoundary';

const initialFormState: AdvisorFormState = {
  currentStep: 'firm-input',
  currentFirmName: '',
  currentFirmMatched: false,
  enteredFirms: [],
  isFormComplete: false,
  maxFirms: 5,
  userEmail: ''
};

interface AdvisorFormProps {
  onComplete?: (firms: FirmEntry[], userEmail: string) => void;
}

export function AdvisorForm({ onComplete }: AdvisorFormProps) {
  const [formState, setFormState] = useState<AdvisorFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [firmInputError, setFirmInputError] = useState<string>('');
  const [currentFirmInput, setCurrentFirmInput] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const canAddMoreFirms = formState.enteredFirms.length < formState.maxFirms;
  const remainingFirms = formState.maxFirms - formState.enteredFirms.length;

  const handleFirmSubmit = useCallback((firmName: string) => {
    setFirmInputError('');

    // Check if firm already entered
    const isAlreadyEntered = formState.enteredFirms.some(
      entry => entry.firmName.toLowerCase() === firmName.toLowerCase()
    );

    if (isAlreadyEntered) {
      setFirmInputError('This firm has already been entered');
      return;
    }

    // Check if firm matches our database
    const isMatched = FirmService.isValidFirm(firmName);
    const exactFirmName = FirmService.getExactFirmName(firmName) || firmName;

    // Clear the input field
    setCurrentFirmInput('');

    setFormState(prev => ({
      ...prev,
      currentFirmName: exactFirmName,
      currentFirmMatched: isMatched,
      currentStep: isMatched ? 'contact-details' : 'thank-you'
    }));
  }, [formState.enteredFirms]);

  const handleContactSubmit = useCallback((contactData: ContactFormData) => {
    console.log('handleContactSubmit called with:', contactData);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newFirmEntry: FirmEntry = {
        id: crypto.randomUUID(),
        firmName: formState.currentFirmName,
        isMatched: true,
        contactName: contactData.name,
        contactDesignation: contactData.designation,
        relationshipStrength: contactData.relationshipStrength,
        timestamp: new Date()
      };

      console.log('Creating new firm entry:', newFirmEntry);

      setFormState(prev => ({
        ...prev,
        enteredFirms: [...prev.enteredFirms, newFirmEntry],
        currentStep: 'firm-input',
        currentFirmName: '',
        currentFirmMatched: false
      }));

      console.log('Returning to firm-input step');
      setLoading(false);
    }, 1000);
  }, [formState.currentFirmName]);

  const handleContactCancel = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      currentStep: 'firm-input',
      currentFirmName: '',
      currentFirmMatched: false
    }));
  }, []);

  const handleThankYouContinue = useCallback(() => {
    // Add the unmatched firm to the list
    const newFirmEntry: FirmEntry = {
      id: crypto.randomUUID(),
      firmName: formState.currentFirmName,
      isMatched: false,
      timestamp: new Date()
    };

    setFormState(prev => ({
      ...prev,
      enteredFirms: [...prev.enteredFirms, newFirmEntry],
      currentStep: 'firm-input',
      currentFirmName: '',
      currentFirmMatched: false
    }));
  }, [formState.currentFirmName]);

  const handleFinish = useCallback(() => {
    // If we're in thank-you step, add the current firm first
    let finalFirms = formState.enteredFirms;

    if (formState.currentStep === 'thank-you' && formState.currentFirmName) {
      const newFirmEntry: FirmEntry = {
        id: crypto.randomUUID(),
        firmName: formState.currentFirmName,
        isMatched: false,
        timestamp: new Date()
      };
      finalFirms = [...finalFirms, newFirmEntry];
    }

    setFormState(prev => ({
      ...prev,
      isFormComplete: true,
      enteredFirms: finalFirms
    }));

    if (onComplete) {
      onComplete(finalFirms, formState.userEmail);
    }
  }, [formState.currentStep, formState.currentFirmName, formState.enteredFirms, formState.userEmail, onComplete]);

  const handleFirmInputChange = useCallback((value: string) => {
    setCurrentFirmInput(value);
    if (firmInputError) {
      setFirmInputError('');
    }
  }, [firmInputError]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = useCallback((email: string) => {
    setFormState(prev => ({
      ...prev,
      userEmail: email
    }));

    if (emailError) {
      setEmailError('');
    }
  }, [emailError]);

  const handleEmailBlur = useCallback(() => {
    if (formState.userEmail && !validateEmail(formState.userEmail)) {
      setEmailError('Please enter a valid email address');
    }
  }, [formState.userEmail]);


  return (
    <div className="space-y-6">
      <ErrorBoundary>
        {formState.isFormComplete && (
          <FormCompleteStep enteredFirms={formState.enteredFirms} />
        )}

        {!formState.isFormComplete && formState.currentStep === 'firm-input' && (
          <FirmInputStep
            currentFirmInput={currentFirmInput}
            onFirmInputChange={handleFirmInputChange}
            onFirmSubmit={handleFirmSubmit}
            firmInputError={firmInputError}
            enteredFirms={formState.enteredFirms}
            remainingFirms={remainingFirms}
            maxFirms={formState.maxFirms}
            onFinish={handleFinish}
            userEmail={formState.userEmail}
            onEmailChange={handleEmailChange}
            onEmailBlur={handleEmailBlur}
            emailError={emailError}
          />
        )}

        {!formState.isFormComplete && formState.currentStep === 'contact-details' && (
          <ContactDetailsStep
            firmName={formState.currentFirmName}
            onSubmit={handleContactSubmit}
            onCancel={handleContactCancel}
            loading={loading}
          />
        )}

        {!formState.isFormComplete && formState.currentStep === 'thank-you' && (
          <ThankYouStep
            firmName={formState.currentFirmName}
            onContinue={handleThankYouContinue}
            onFinish={handleFinish}
            canAddMore={canAddMoreFirms}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default AdvisorForm;