import type { FirmEntry } from '../types';
import Icon from './Icon';

interface FirmSummaryListProps {
  firms: FirmEntry[];
  onRemoveFirm?: (firmId: string) => void;
}

function FirmSummaryCard({ firm, onRemove }: { firm: FirmEntry; onRemove?: (firmId: string) => void }) {
  return (
    <div className="bg-white rounded-lg p-4 relative" style={{ border: '1px solid #eeeeee' }}>
      {onRemove && (
        <button
          onClick={() => onRemove(firm.id)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-neutral-8 transition-colors duration-150 cursor-pointer text-neutral-1 hover:text-neutral-0"
          aria-label="Remove firm"
        >
          <Icon type="close" size="small" />
        </button>
      )}
      <div className="pl-4 py-3">
        <p className="typography-label-lg text-neutral-0 font-semibold">
          {firm.firmName}
        </p>
        <p className="text-neutral-1 mt-1" style={{ fontSize: '14px' }}>
          {firm.isMatched
            ? `${firm.contactName} • ${firm.contactDesignation}`
            : "Thank you. We'll be in touch with you about this firm."
          }
        </p>
      </div>
    </div>
  );
}

export function FirmSummaryList({ firms, onRemoveFirm }: FirmSummaryListProps) {
  if (firms.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="typography-h4 text-night-sky-blue-dark-1 mb-2">
          Firms Added
        </h3>
        <p className="text-base text-night-sky-blue-1 mb-4">
          {firms.length} of 5 firms entered
        </p>
        <div className="space-y-3">
          {firms.map((firm) => (
            <FirmSummaryCard key={firm.id} firm={firm} onRemove={onRemoveFirm} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FirmSummaryList;