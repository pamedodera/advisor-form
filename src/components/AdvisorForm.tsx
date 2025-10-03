import { useState, useCallback } from 'react';
import type { AdvisorFormState, FirmEntry, ContactFormData } from '../types';
import { FirmService } from '../services/FirmService';
import FirmInputStep from './FirmInputStep';
import ContactDetailsStep from './ContactDetailsStep';
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
  onToast?: (message: string) => void;
  onFirmsChange?: (firms: FirmEntry[]) => void;
}

export function AdvisorForm({ onComplete, onToast, onFirmsChange }: AdvisorFormProps) {
  const [formState, setFormState] = useState<AdvisorFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [firmInputError, setFirmInputError] = useState<string>('');
  const [currentFirmInput, setCurrentFirmInput] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const remainingFirms = formState.maxFirms - formState.enteredFirms.length;

  const handleFirmSubmit = useCallback((firmName: string) => {
    setFirmInputError('');

    // Validate email is provided and valid before allowing any firm submission
    if (!formState.userEmail) {
      setEmailError('Please enter your email address before adding a firm');
      return;
    }

    if (!validateEmail(formState.userEmail)) {
      setEmailError('Please enter a valid email address before adding a firm');
      return;
    }

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

    if (isMatched) {
      // Matched firm: go to contact details step
      setFormState(prev => ({
        ...prev,
        currentFirmName: exactFirmName,
        currentFirmMatched: isMatched,
        currentStep: 'contact-details'
      }));
    } else {
      // Unmatched firm: add to list immediately and show toast
      const newFirmEntry: FirmEntry = {
        id: crypto.randomUUID(),
        firmName: exactFirmName,
        isMatched: false,
        timestamp: new Date()
      };

      setFormState(prev => {
        const updatedFirms = [...prev.enteredFirms, newFirmEntry];
        if (onFirmsChange) {
          onFirmsChange(updatedFirms);
        }
        return {
          ...prev,
          enteredFirms: updatedFirms,
          currentFirmName: '',
          currentFirmMatched: false,
          currentStep: 'firm-input'
        };
      });

      // Show toast notification
      if (onToast) {
        onToast(`Thank you! We'll be in touch with you about ${exactFirmName}.`);
      }
    }
  }, [formState.enteredFirms, formState.userEmail, onFirmsChange, onToast]);

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
        contactFrequency: contactData.contactFrequency,
        timestamp: new Date()
      };

      console.log('Creating new firm entry:', newFirmEntry);

      setFormState(prev => {
        const updatedFirms = [...prev.enteredFirms, newFirmEntry];
        if (onFirmsChange) {
          onFirmsChange(updatedFirms);
        }
        return {
          ...prev,
          enteredFirms: updatedFirms,
          currentStep: 'firm-input',
          currentFirmName: '',
          currentFirmMatched: false
        };
      });

      // Show toast notification for matched firm
      if (onToast) {
        onToast(`Thank you! We'll be in touch with you about ${formState.currentFirmName}.`);
      }

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


  const handleFinish = useCallback(async () => {
    // Validate email is provided and valid
    if (!formState.userEmail) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(formState.userEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // No need to check for thank-you step since unmatched firms are added immediately
    let finalFirms = formState.enteredFirms;

    // Submit to Netlify function
    try {
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firms: finalFirms,
          userEmail: formState.userEmail
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      setFormState(prev => ({
        ...prev,
        isFormComplete: true,
        enteredFirms: finalFirms
      }));

      if (onComplete) {
        onComplete(finalFirms, formState.userEmail);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show completion screen even if Slack notification fails
      setFormState(prev => ({
        ...prev,
        isFormComplete: true,
        enteredFirms: finalFirms
      }));

      if (onComplete) {
        onComplete(finalFirms, formState.userEmail);
      }
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

  const handleNewSubmission = useCallback(() => {
    setFormState(initialFormState);
    setCurrentFirmInput('');
    setFirmInputError('');
    setEmailError('');
  }, []);

  const handleRemoveFirm = useCallback((firmId: string) => {
    setFormState(prev => {
      const updatedFirms = prev.enteredFirms.filter(firm => firm.id !== firmId);
      if (onFirmsChange) {
        onFirmsChange(updatedFirms);
      }
      return {
        ...prev,
        enteredFirms: updatedFirms
      };
    });
  }, [onFirmsChange]);

  return (
    <div className="space-y-6 relative">
      <ErrorBoundary>
        {formState.isFormComplete && (
          <FormCompleteStep
            enteredFirms={formState.enteredFirms}
            onNewSubmission={handleNewSubmission}
          />
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
            onRemoveFirm={handleRemoveFirm}
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
      </ErrorBoundary>
    </div>
  );
}

export default AdvisorForm;