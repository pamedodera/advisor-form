import FirmInput from './FirmInput';
import FirmSummaryList from './FirmSummaryList';
import Button from './Button';
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
}

export function FirmInputStep({
  currentFirmInput,
  onFirmInputChange,
  onFirmSubmit,
  firmInputError,
  enteredFirms,
  remainingFirms,
  maxFirms,
  onFinish
}: FirmInputStepProps) {
  return (
    <div className="space-y-6">
      {/* Add new firm section */}
      <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="typography-h4 text-night-sky-blue-dark-1 mb-2">
              {enteredFirms.length === 0 ? 'Add Law Firm' : 'Add Another Law Firm'}
            </h3>
            <p className="text-neutral-1">
              {enteredFirms.length === 0
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
            onChange={onFirmInputChange}
            onSubmit={onFirmSubmit}
            placeholder="Type law firm name..."
            error={firmInputError}
          />

          {enteredFirms.length > 0 && (
            <div className="pt-4">
              <Button
                appearance="secondary"
                size="large"
                onClick={onFinish}
                className="w-full"
              >
                {enteredFirms.length === maxFirms
                  ? "Finish"
                  : `Finish (${enteredFirms.length} firm${enteredFirms.length !== 1 ? 's' : ''} entered)`
                }
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Show previously entered firms if any */}
      {enteredFirms.length > 0 && (
        <>
          <hr className="border-neutral-4" />
          <FirmSummaryList firms={enteredFirms} />
        </>
      )}
    </div>
  );
}

export default FirmInputStep;