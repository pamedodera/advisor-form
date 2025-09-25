import { useState, useCallback } from 'react';
import type { AdvisorFormState, FirmEntry, ContactFormData } from '../types';
import { FirmService } from '../services/FirmService';
import FirmInput from './FirmInput';
import ContactForm from './ContactForm';
import ThankYouMessage from './ThankYouMessage';
import FirmSummaryList from './FirmSummaryList';
import Button from './Button';
import ErrorBoundary from './ErrorBoundary';

const initialFormState: AdvisorFormState = {
  currentStep: 'firm-input',
  currentFirmName: '',
  currentFirmMatched: false,
  enteredFirms: [],
  isFormComplete: false,
  maxFirms: 5
};

interface AdvisorFormProps {
  onComplete?: (firms: FirmEntry[]) => void;
}

export function AdvisorForm({ onComplete }: AdvisorFormProps) {
  const [formState, setFormState] = useState<AdvisorFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [firmInputError, setFirmInputError] = useState<string>('');
  const [currentFirmInput, setCurrentFirmInput] = useState<string>('');

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
      onComplete(finalFirms);
    }
  }, [formState.currentStep, formState.currentFirmName, formState.enteredFirms, onComplete]);

  const handleFirmInputChange = useCallback((value: string) => {
    setCurrentFirmInput(value);
    if (firmInputError) {
      setFirmInputError('');
    }
  }, [firmInputError]);

  const renderCurrentStep = () => {
    console.log('Rendering step:', formState.currentStep, 'Form state:', formState);

    switch (formState.currentStep) {
      case 'firm-input':
        return (
          <div className="space-y-6">
            {/* Add new firm section */}
            <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="typography-h4 text-night-sky-blue-dark-1 mb-2">
                    {formState.enteredFirms.length === 0 ? 'Add Law Firm' : 'Add Another Law Firm'}
                  </h3>
                  <p className="text-neutral-1">
                    {formState.enteredFirms.length === 0
                      ? <span className="typography-body-text">Enter the first law firm where you have relevant relationships.</span>
                      : <span className="text-[16px] leading-[20px] font-normal tracking-normal">
                          {remainingFirms === 0
                            ? "Enter another law firm."
                            : `Enter another law firm (${remainingFirms} remaining).`
                          }
                        </span>
                    }
                  </p>
                </div>

                <FirmInput
                  value={currentFirmInput}
                  onChange={handleFirmInputChange}
                  onSubmit={handleFirmSubmit}
                  placeholder="Type law firm name..."
                  error={firmInputError}
                />

                {formState.enteredFirms.length > 0 && (
                  <div className="pt-4">
                    <Button
                      appearance="secondary"
                      size="large"
                      onClick={handleFinish}
                      className="w-full"
                    >
                      {formState.enteredFirms.length === formState.maxFirms
                        ? "Finish"
                        : `Finish (${formState.enteredFirms.length} firm${formState.enteredFirms.length !== 1 ? 's' : ''} entered)`
                      }
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Show previously entered firms if any */}
            {formState.enteredFirms.length > 0 && (
              <>
                <hr className="border-neutral-4" />
                <FirmSummaryList firms={formState.enteredFirms} />
              </>
            )}
          </div>
        );

      case 'contact-details':
        return (
          <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
            <ContactForm
              firmName={formState.currentFirmName}
              onSubmit={handleContactSubmit}
              onCancel={handleContactCancel}
              loading={loading}
            />
          </div>
        );

      case 'thank-you':
        return (
          <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
            <ThankYouMessage
              firmName={formState.currentFirmName}
              onContinue={handleThankYouContinue}
              onFinish={handleFinish}
              canAddMore={canAddMoreFirms}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (formState.isFormComplete) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-0 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h3 className="typography-h4 text-night-sky-blue-dark-1 mb-2">
            Form Complete
          </h3>
          <p className="typography-body-text text-neutral-1">
            Thank you! You've submitted {formState.enteredFirms.length} firm{formState.enteredFirms.length !== 1 ? 's' : ''}.
            We'll be in touch soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ErrorBoundary>
        {renderCurrentStep()}
      </ErrorBoundary>
    </div>
  );
}

export default AdvisorForm;