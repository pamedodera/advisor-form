import FirmInput from './FirmInput';
import FirmSummaryList from './FirmSummaryList';
import Button from './Button';
import Input from './Input';
import type { FirmEntry } from '../types';

interface FirmInputStepProps {
  currentFirmInput: string;
  onFirmInputChange: (value: string) => void;
  onFirmSubmit: (firmName: string) => void;
  firmInputError: string;
  enteredFirms: FirmEntry[];
  remainingFirms: number;
  maxFirms: number;
  onFinish: () => void;
  userEmail: string;
  onEmailChange: (email: string) => void;
  onEmailBlur?: () => void;
  emailError: string;
  onRemoveFirm?: (firmId: string) => void;
}

export function FirmInputStep({
  currentFirmInput,
  onFirmInputChange,
  onFirmSubmit,
  firmInputError,
  enteredFirms,
  remainingFirms,
  maxFirms,
  onFinish,
  userEmail,
  onEmailChange,
  onEmailBlur,
  emailError,
  onRemoveFirm
}: FirmInputStepProps) {
  return (
    <div className="space-y-4">
      {/* Show email input only when no firms entered */}
      {enteredFirms.length === 0 && (
        <div>
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            value={userEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={onEmailBlur}
            error={emailError}
            required
            size="large"
          />
        </div>
      )}

      <div>
        <div className="space-y-1">
          <label className="block mb-1 text-left typography-label-lg text-neutral-0">
            {enteredFirms.length === 0 ? 'Law Firm' : 'Add Another Law Firm'}
            <span className="text-red-0 ml-1">*</span>
          </label>
          <p className="typography-body-text text-left w-full text-night-sky-blue-1 pb-2">
            {enteredFirms.length === 0
              ? "Enter the first law firm"
              : remainingFirms === 0
              ? "Enter another law firm"
              : `Enter another law firm (${remainingFirms} remaining)`
            }
          </p>
        </div>

        <FirmInput
          value={currentFirmInput}
          onChange={onFirmInputChange}
          onSubmit={onFirmSubmit}
          placeholder="Type law firm name..."
          error={firmInputError}
        />
      </div>

      {enteredFirms.length > 0 && (
        <div className="pt-4">
          <Button
            appearance="primary"
            size="large"
            onClick={onFinish}
            className="w-full"
          >
            {enteredFirms.length === maxFirms
              ? "Submit"
              : `Submit (${enteredFirms.length} firm${enteredFirms.length !== 1 ? 's' : ''} entered)`
            }
          </Button>
        </div>
      )}
    </div>
  );
}

export default FirmInputStep;