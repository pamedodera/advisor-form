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
    <div>
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