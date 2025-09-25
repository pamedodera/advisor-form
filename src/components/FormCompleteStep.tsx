import type { FirmEntry } from '../types';

interface FormCompleteStepProps {
  enteredFirms: FirmEntry[];
}

export function FormCompleteStep({ enteredFirms }: FormCompleteStepProps) {
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
          Thank you! You've submitted {enteredFirms.length} firm{enteredFirms.length !== 1 ? 's' : ''}.
          We'll be in touch soon.
        </p>
      </div>
    </div>
  );
}

export default FormCompleteStep;