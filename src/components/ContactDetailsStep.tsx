import ContactForm from './ContactForm';
import type { ContactFormData } from '../types';

interface ContactDetailsStepProps {
  firmName: string;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

export function ContactDetailsStep({
  firmName,
  onSubmit,
  onCancel,
  loading
}: ContactDetailsStepProps) {
  return (
    <div className="bg-white border border-neutral-4 rounded-lg p-6 shadow-sm">
      <ContactForm
        firmName={firmName}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    </div>
  );
}

export default ContactDetailsStep;