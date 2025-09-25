import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Disclosure } from "./Disclosure";
import Icon from "./Icon";

export interface DefinitionDetailProps {
  id: string;
  name: string;
  status: "inline" | "undefined" | "listed" | "unused";
  isSelected?: boolean;
  isExpanded?: boolean;
  occurrenceCount?: number;
  message?: string;
  occurrences?: Array<{
    id: string;
    title: string;
    items: Array<{
      id: string;
      text: string;
      context?: string;
      location?: string;
    }>;
  }>;
  actions?: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    onClick: () => void;
  }>;
  onSelectionChange?: (id: string, selected: boolean) => void;
  onExpandToggle?: (id: string, expanded: boolean) => void;
  onOccurrenceClick?: (occurrenceId: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const statusConfig = {
  inline: {
    label: "Inline",
    intent: "positive" as const,
  },
  undefined: {
    label: "Undefined",
    intent: "negative" as const,
  },
  listed: {
    label: "Listed",
    intent: "informative" as const,
  },
  unused: {
    label: "Unused",
    intent: "neutral" as const,
  },
} as const;

export function DefinitionDetail({
  id,
  name,
  status,
  isSelected = false,
  isExpanded = false,
  occurrenceCount = 0,
  message = "Definition not found",
  occurrences = [],
  actions = [],
  onSelectionChange,
  onExpandToggle,
  onOccurrenceClick,
  children,
  className = "",
}: DefinitionDetailProps) {
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);

  const expanded = onExpandToggle ? isExpanded : internalExpanded;
  const toggleExpanded = onExpandToggle
    ? (newExpanded: boolean) => onExpandToggle(id, newExpanded)
    : setInternalExpanded;

  const statusInfo = statusConfig[status];

  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(id, checked);
  };

  const handleExpandToggle = () => {
    toggleExpanded(!expanded);
  };

  return (
    <div className={`bg-white overflow-hidden ${className}`}>
      {/* Header Row */}
      <div className="flex items-center gap-3 p-3 hover:bg-neutral-8 transition-colors duration-200">
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxChange}
            id={`definition-detail-${id}`}
            size="small"
            aria-label={`Select ${name}`}
          />
        </div>

        {/* Bookmark Button */}
        <div className="flex-shrink-0">
          <Button
            beforeIcon={<Icon type="bookmark" size="small" decorative />}
            type="ghost"
            appearance="secondary"
            size="small"
            onClick={() => {
              // TODO: Implement bookmark functionality
              console.log(`Bookmark ${name}`);
            }}
            aria-label={`Bookmark ${name} definition`}
          />
        </div>

        {/* Definition Name */}
        <div className="flex-1 min-w-0">
          <span className="typography-body-text text-neutral-dark-1 truncate block">
            {name}
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <Badge
            label={statusInfo.label}
            intent={statusInfo.intent}
            aria-label={`Status: ${statusInfo.label}`}
          />
        </div>

        {/* Expand/Collapse Button */}
        <div className="flex-shrink-0">
          <Button
            beforeIcon={
              <Icon
                type={expanded ? "caret-up" : "caret-down"}
                size="small"
                decorative
              />
            }
            type="ghost"
            appearance="secondary"
            size="small"
            onClick={handleExpandToggle}
            aria-label={
              expanded ? `Collapse ${name} details` : `Expand ${name} details`
            }
            aria-expanded={expanded}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-neutral-4">
          {/* Message Section - only show for undefined/unused items */}
          {message && (status === "undefined" || status === "unused") && (
            <div className="px-6 py-4 bg-neutral-8">
              <div className="flex items-center justify-between">
                <span className="typography-body-text text-neutral-1">
                  {message}
                </span>

                {/* Action Buttons */}
                {actions.length > 0 && (
                  <div className="flex items-center gap-2">
                    {actions.map((action) => (
                      <Button
                        key={action.id}
                        label={action.label}
                        appearance={action.type}
                        size="small"
                        onClick={action.onClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Occurrences Section */}
          {occurrences && occurrences.length > 0 && (
            <div className="border-t border-neutral-4">
              {/* Occurrences Header with Pagination */}
              <div className="px-6 pt-3 ">
                <div className="flex items-center justify-between">
                  <span className="typography-label text-neutral-dark-1">
                    Occurrences
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="typography-body-text-sm text-neutral-1">
                      {occurrences.length} result{occurrences.length !== 1 ? "s" : ""}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        beforeIcon={<Icon type="caret-left" size="small" decorative />}
                        type="ghost"
                        appearance="secondary"
                        size="small"
                        onClick={() => {
                          // TODO: Implement previous page navigation
                          console.log('Previous occurrence');
                        }}
                        aria-label="Previous occurrence"
                      />
                      <Button
                        beforeIcon={<Icon type="caret-right" size="small" decorative />}
                        type="ghost"
                        appearance="secondary"
                        size="small"
                        onClick={() => {
                          // TODO: Implement next page navigation
                          console.log('Next occurrence');
                        }}
                        aria-label="Next occurrence"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Occurrences List */}
              <div className="p-4">
                <div className="rounded-md border border-neutral-4 overflow-hidden">
                  {occurrences.map((occurrence, index) => (
                    <Disclosure
                      key={occurrence.id}
                      trigger={occurrence.title}
                      size="medium"
                      intent="neutral"
                      variant="ghost"
                      showChevron={true}
                      defaultOpen={false}
                      className={`w-full ${index !== occurrences.length - 1 ? 'border-b border-neutral-4' : ''}`}
                      triggerClassName="px-4 py-3 typography-body-text"
                      panelClassName="px-4 py-3 bg-neutral-8"
                    >
                      <div className="space-y-3">
                        {occurrence.items.map((item) => (
                          <div key={item.id} className="space-y-2">
                            <div className="typography-body-text-sm text-neutral-dark-1">
                              {item.text}
                            </div>
                            {item.context && (
                              <div className="typography-body-text-sm text-neutral-1">
                                {item.context}
                              </div>
                            )}
                            {item.location && (
                              <div className="typography-body-text-sm text-neutral-2">
                                {item.location}
                              </div>
                            )}
                            <Button
                              beforeIcon={<Icon type="expand-window" size="small" decorative />}
                              type="ghost"
                              appearance="secondary"
                              size="small"
                              onClick={() => {
                                onOccurrenceClick?.(item.id);
                              }}
                              aria-label={`View occurrence in document`}
                              className="mt-2"
                            />
                          </div>
                        ))}
                      </div>
                    </Disclosure>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom Children Content */}
          {children && <div className="px-6 py-4">{children}</div>}

          {/* Status-specific Content Section */}
          {(() => {
            // For inline and listed items, always show status content instead of generic message
            const showStatusContent =
              (status === "inline" || status === "listed") &&
              !children &&
              (occurrenceCount === undefined || occurrenceCount === 0);
            // For undefined/unused items, show default content only if no message/children/occurrences
            const showDefaultContent =
              (status === "undefined" || status === "unused") &&
              !message &&
              !children &&
              (occurrenceCount === undefined || occurrenceCount === 0);

            console.log(`DefinitionDetail ${name}:`, {
              message,
              children,
              occurrenceCount,
              showStatusContent,
              showDefaultContent,
              status,
            });
            return showStatusContent || showDefaultContent;
          })() && (
            <div className="px-6 py-4">
              {status === "inline" && (
                <div className="space-y-4">
                  {/* Term-specific content */}
                  <div className="space-y-3">
                    {name === "Ancillary Lender" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          A financial institution that provides additional
                          lending support or services in conjunction with the
                          primary lender in a credit facility or loan agreement.
                        </div>
                      </div>
                    )}
                    {name === "Existing Lender" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          A lender that is currently party to the credit
                          agreement and has existing commitments or outstanding
                          loans under the facility.
                        </div>
                      </div>
                    )}
                    {name === "Increase Lender" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          A lender that agrees to increase their commitment
                          amount or provide additional funding under the
                          existing credit facility.
                        </div>
                      </div>
                    )}
                    {name === "Non-Acceptable L/C Lender" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          A lender whose letters of credit do not meet the
                          specified criteria or standards set forth in the
                          credit agreement for acceptable letters of credit.
                        </div>
                      </div>
                    )}
                    {name === "Accession Deed" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          A legal document executed by a new lender to become a
                          party to an existing credit agreement, typically used
                          when a lender joins the facility after the initial
                          signing.
                        </div>
                      </div>
                    )}
                    {/* Default content for other inline terms */}
                    {![
                      "Ancillary Lender",
                      "Existing Lender",
                      "Increase Lender",
                      "Non-Acceptable L/C Lender",
                      "Accession Deed",
                    ].includes(name) && (
                      <div className="text-neutral-1 typography-body-text-sm">
                        This term is properly defined within the document text
                        where it first appears.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {status === "listed" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="typography-label text-neutral-dark-1">
                      Definition Status
                    </span>
                    <span className="typography-body-text-sm text-blue-0">
                      Listed in definitions section
                    </span>
                  </div>

                  {/* Term-specific content */}
                  <div className="space-y-3">
                    {name === "Majority Lender" && (
                      <div>
                        <div className="typography-label text-neutral-dark-1 mb-2">
                          Definition
                        </div>
                        <div className="text-neutral-1 typography-body-text-sm">
                          Lenders holding more than 50% of the total commitments
                          under the credit facility, or such other percentage as
                          may be specified in the agreement for decisions
                          requiring majority lender consent.
                        </div>
                      </div>
                    )}
                    {/* Default content for other listed terms */}
                    {name !== "Majority Lender" && (
                      <div className="text-neutral-1 typography-body-text-sm">
                        This term is defined in a dedicated definitions section
                        of the document.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {(status === "undefined" || status === "unused") && (
                <div className="text-center">
                  <div className="text-neutral-2 typography-body-text-sm">
                    No additional details available
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DefinitionDetail;
