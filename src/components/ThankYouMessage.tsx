import { } from 'react';
import Button from './Button';

interface ThankYouMessageProps {
  firmName: string;
  onContinue: () => void;
  onFinish: () => void;
  canAddMore: boolean;
}

export function ThankYouMessage({
  firmName,
  onContinue,
  onFinish,
  canAddMore
}: ThankYouMessageProps) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-0 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
          Thank You
        </h3>
        <p className="typography-body-text text-neutral-1">
          We'll be in touch with you about <span className="font-semibold">{firmName}</span>.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        {canAddMore && (
          <Button
            appearance="primary"
            size="large"
            onClick={onContinue}
            className="flex-1"
          >
            Add Another Firm
          </Button>
        )}
        <Button
          appearance={canAddMore ? "secondary" : "primary"}
          size="large"
          onClick={onFinish}
          className={canAddMore ? "" : "flex-1"}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}

export default ThankYouMessage;