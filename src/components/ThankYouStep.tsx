import ThankYouMessage from './ThankYouMessage';

interface ThankYouStepProps {
  firmName: string;
  onContinue: () => void;
  onFinish: () => void;
  canAddMore: boolean;
}

export function ThankYouStep({
  firmName,
  onContinue,
  onFinish,
  canAddMore
}: ThankYouStepProps) {
  return (
    <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
      <ThankYouMessage
        firmName={firmName}
        onContinue={onContinue}
        onFinish={onFinish}
        canAddMore={canAddMore}
      />
    </div>
  );
}

export default ThankYouStep;