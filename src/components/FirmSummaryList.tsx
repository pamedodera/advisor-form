import type { FirmEntry } from '../types';

interface FirmSummaryListProps {
  firms: FirmEntry[];
}

function FirmSummaryCard({ firm }: { firm: FirmEntry }) {

  if (!firm.isMatched) {
    // Unmatched firm - show with same card style as matched firms
    return (
      <div className="bg-white border border-neutral-4 rounded-lg p-4 shadow-sm">
        <div className="bg-night-sky-blue-8 border-l-4 border-dark-blue-0 pl-4 py-3 rounded-r">
          <p className="typography-body-text text-neutral-0 font-semibold">
            {firm.firmName}
          </p>
          <p className="typography-body-text-sm text-neutral-1 mt-1">
            Thank you — we'll be in touch with you about this firm.
          </p>
        </div>
      </div>
    );
  }

  // Matched firm - show contact details
  return (
    <div className="bg-white border border-neutral-4 rounded-lg p-4 shadow-sm">
      <div className="bg-night-sky-blue-8 border-l-4 border-dark-blue-0 pl-4 py-3 rounded-r">
        <p className="typography-body-text text-neutral-0 font-semibold">
          {firm.contactName}
        </p>
        <p className="typography-body-text-sm text-neutral-1 mt-1">
          {firm.firmName} • {firm.contactDesignation}
        </p>
      </div>
    </div>
  );
}

export function FirmSummaryList({ firms }: FirmSummaryListProps) {
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
          Progress: {firms.length} of 5 firms entered
        </p>
        <div className="space-y-3">
          {firms.map((firm) => (
            <FirmSummaryCard key={firm.id} firm={firm} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FirmSummaryList;