import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import type { ContactFormData } from '../types';

interface ContactFormProps {
  firmName: string;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ContactForm({
  firmName,
  onSubmit,
  onCancel,
  loading = false
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    designation: '',
    relationshipStrength: '',
    contactFrequency: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.relationshipStrength) {
      newErrors.relationshipStrength = 'Please select relationship strength';
    }

    if (!formData.contactFrequency) {
      newErrors.contactFrequency = 'Please select contact frequency';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Contact name is required';
    }

    if (!formData.designation || !formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleRelationshipChange = (value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      relationshipStrength: value as ContactFormData['relationshipStrength']
    }));

    // Clear error when user selects
    if (errors.relationshipStrength) {
      setErrors(prev => ({
        ...prev,
        relationshipStrength: undefined
      }));
    }
  };

  const handleFrequencyChange = (value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      contactFrequency: value as ContactFormData['contactFrequency']
    }));

    // Clear error when user selects
    if (errors.contactFrequency) {
      setErrors(prev => ({
        ...prev,
        contactFrequency: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted with data:', formData);

    if (validateForm()) {
      console.log('Validation passed, calling onSubmit');
      onSubmit(formData);
    } else {
      console.log('Validation failed with errors:', errors);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', designation: '', relationshipStrength: '', contactFrequency: '' });
    setErrors({});
    onCancel();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-left typography-label-lg text-neutral-0">
            How strong is your relationship with <span className="font-semibold">{firmName}</span>?
            <span className="text-red-0 ml-1">*</span>
          </label>
          <Select
            id="relationship-strength"
            name="relationshipStrength"
            value={formData.relationshipStrength}
            onChange={handleRelationshipChange}
            options={[
              { value: 'very-strong', label: 'Very strong' },
              { value: 'strong', label: 'Strong' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'weak', label: 'Weak' }
            ]}
            error={errors.relationshipStrength}
            required
            disabled={loading}
            size="large"
            placeholder="Select relationship strength..."
          />
        </div>

        <div>
          <Select
            id="contact-frequency"
            name="contactFrequency"
            label="How often are you in touch with your contact?"
            value={formData.contactFrequency}
            onChange={handleFrequencyChange}
            options={[
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'annually', label: 'Annually' },
              { value: 'occasionally', label: 'Occasionally' },
              { value: 'recently', label: 'Recently' }
            ]}
            error={errors.contactFrequency}
            required
            disabled={loading}
            size="large"
            placeholder="Select contact frequency..."
          />
        </div>

        <div>
          <Input
            id="contact-name"
            name="contactName"
            label="Contact Name"
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Enter contact name"
            error={errors.name}
            required
            disabled={loading}
            size="large"
          />
        </div>

        <div>
          <Input
            id="contact-designation"
            name="contactDesignation"
            label="Designation"
            value={formData.designation}
            onChange={handleInputChange('designation')}
            placeholder="Enter designation (e.g., Partner, Associate, etc.)"
            error={errors.designation}
            required
            disabled={loading}
            size="large"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            htmlType="submit"
            appearance="primary"
            size="large"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Saving...' : 'Save Contact'}
          </Button>
          <Button
            htmlType="button"
            appearance="secondary"
            size="large"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;