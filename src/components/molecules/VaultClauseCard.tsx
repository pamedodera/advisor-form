import { useState } from "react";
import { Tabs } from "../Tabs";
import { Input } from "../Input";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import Icon from "../Icon";
import ResizeHandle from "../ResizeHandle";
import Breadcrumbs from "../Breadcrumbs";

interface ClauseCardProps {
  title: string;
  content: string;
  section: { label: string; onClick?: () => void; href?: string }[];
  definition: string;
  source: string;
  onShowInfo?: () => void;
  onNotes?: () => void;
  onCompare?: () => void;
  onInsert?: () => void;
}

function ClauseCard({
  title,
  content,
  section,
  source,
  onShowInfo,
  onNotes,
  onCompare,
  onInsert,
}: ClauseCardProps) {
  return (
    <div className="bg-white border border-neutral-3 rounded-md pt-5 mb-4 overflow-hidden">
      {/* Clause Header */}
      <div className="mb-3 border-b border-neutral-5 pb-3 px-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <Icon type="bookmark" size="small" />

          <span className="truncate typography-h5 text-neutral-dark-1">
            {title}
          </span>

          <div className="flex items-center gap-1 ">
            <Icon type="bolt" size="small" />
            <Icon type="personal" size="small" />
          </div>
        </div>
      </div>

      {/* Clause Content */}
      <div className="mb-4 px-5">
        <div className="mb-2">
          <div className="flex items-center gap-2 text-xs text-neutral-1 justify-between">
            <Breadcrumbs items={section} className="text-xs" />
            <Dropdown items={[{ id: "1", label: "v12" }, { id: "2", label: "v11" }]}>
              <Button
                label={`v12`}
                size="small"
                appearance="secondary"
                hasDropdownIndicator
              />
            </Dropdown>
          </div>
          <div className="typography-label mt-3 tracking-wide uppercase flex items-center gap-2 cursor-pointer">
            <Icon
              type="arrow-external"
              size="small"
              className="text-dark-blue-0"
            />
            <span className=" text-dark-blue-0">{source}</span>
          </div>
        </div>
        <div className="typography-body-text text-neutral-dark-1 leading-relaxed font-serif mt-4">
          {content}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between p-3 border-t border-neutral-5 bg-neutral-8">
        <div className="flex items-center gap-2">
          <Button
            label="Show Info"
            type="ghost"
            size="small"
            appearance="secondary"
            onClick={onShowInfo}
          />
          <Button
            label="Notes"
            type="ghost"
            size="small"
            onClick={onNotes}
            appearance="secondary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            label="Compare"
            size="small"
            onClick={onCompare}
            appearance="secondary"
          />
          <Button
            label="Insert"
            appearance="primary"
            size="small"
            onClick={onInsert}
          />
        </div>
      </div>
    </div>
  );
}

export interface VaultClauseCardProps {
  width?: number;
  onResize?: (newWidth: number) => void;
  isResizable?: boolean;
}

export function VaultClauseCard({
  width = 600,
  onResize,
  isResizable = true,
}: VaultClauseCardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("vault");
  const [selectedSecondaryTab, setSelectedSecondaryTab] = useState("clauses");
  const [sortBy, setSortBy] = useState("relevance");

  const mainTabs = [
    { id: "vault", label: "Vault", content: <div /> },
    { id: "draft", label: "Draft", content: <div /> },
    { id: "proof", label: "Proof", content: <div /> },
    { id: "enhance", label: "Enhance", content: <div /> },
    { id: "cascade", label: "Cascade", content: <div /> },
    { id: "pdf", label: "PDF", content: <div /> },
  ];

  const secondaryTabs = [
    { id: "clauses", label: "Clauses", content: <div /> },
    { id: "definitions", label: "Definitions", content: <div /> },
    { id: "documents", label: "Documents", content: <div /> },
  ];

  const sortOptions = [
    {
      id: "relevance",
      label: "Relevance",
      onClick: () => setSortBy("relevance"),
    },
    { id: "date", label: "Date", onClick: () => setSortBy("date") },
    { id: "title", label: "Title", onClick: () => setSortBy("title") },
  ];

  const mockClause = {
    title:
      "7.4 Cash collateral by Non-Acceptable L/C Super Long Text Of The Universe",
    content:
      "Subject to the terms of this Agreement, an Affiliate of a Lender may become an Ancillary Lender. In such case, the Lender and its Affiliate will be treated as a single Lender whose Revolving Facility Commitment is the amount set out opposite the relevant Lender's name in Part II or Part III of Schedule 1. The amount of any Revolving Facility Commitment transferred to or assumed by that Lender under this Agreement, to the extent (in each case) not cancelled, reduced or transferred by it under this Agreement. For the purposes of calculating the Lender's Available Commitment with respect to the Revolving Facility, the Lender's Commitment shall be reduced to the extent of the aggregate of the Ancillary Commitments of its Affiliates.",
    section: [
      { label: "SECTION 1 IN..." },
      { label: "DEFINITION A..." },
      { label: "Definitions" },
    ],
    definition: "ALMA 2012 Term _ Revolving Facility Agreement",
    source: "ALMA 2012 Term _ Revolving Facility Agreement",
  };

  return (
    <div className="flex h-[60vh] bg-neutral-7">
      {/* Main Panel */}
      <div
        className="flex flex-col bg-white border-r border-neutral-3 shadow-lg"
        style={{ width: `${width}px` }}
      >
        {/* Header with Main Navigation */}
        <div className="pt-3">
          <Tabs
            tabs={mainTabs}
            defaultTab={selectedTab}
            onChange={setSelectedTab}
            variant="underline"
            size="small"
          />
        </div>
        <div className="bg-night-sky-blue-7 p-3">
          {/* Secondary Navigation */}
          <Tabs
            tabs={secondaryTabs}
            defaultTab={selectedSecondaryTab}
            onChange={setSelectedSecondaryTab}
            variant="pills"
            size="small"
          />

          {/* Search and Controls */}
          <div className="flex items-center pb-1 gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="medium"
                beforeIcon={<Icon type="search" size="small" />}
              />
            </div>
            <Button label="Search" appearance="primary" size="medium" />
            <Button beforeIcon={<Icon type="funnel-simple" size="medium" />} size="medium" appearance="secondary"/>
          </div>
        </div>
        <div className="px-3 pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <Button
              beforeIcon={<Icon type="caret-left" size="small" />}
              size="small"
              appearance="secondary"
            />
            <div className="flex items-center gap-2">
              <Button
                label="Add Personal Clause"
                beforeIcon={<Icon type="plus" size="small" />}
                appearance="secondary"
                size="small"
              />
              <Button label="Compare All" appearance="secondary" size="small" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Dropdown items={sortOptions} size="small">
              <Button
                label={`Sort by: ${
                  sortOptions.find((opt) => opt.id === sortBy)?.label ||
                  "Relevance"
                }`}
                type="ghost"
                size="small"
                hasDropdownIndicator
              />
            </Dropdown>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3">
          <ClauseCard
            title={mockClause.title}
            content={mockClause.content}
            section={mockClause.section}
            definition={mockClause.definition}
            source={mockClause.source}
            onShowInfo={() => console.log("Show Info")}
            onNotes={() => console.log("Notes")}
            onCompare={() => console.log("Compare")}
            onInsert={() => console.log("Insert")}
          />
        </div>
      </div>

      {/* Resize Handle */}
      {isResizable && onResize && (
        <ResizeHandle onResize={onResize} minWidth={420} maxWidth={600} />
      )}
    </div>
  );
}

export default VaultClauseCard;
