import Button from './Button';
import Icon from './Icon';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
  [key: string]: unknown;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const { label, ...buttonProps } = item;

          return (
            <li key={index} className="flex items-center">
              <Button
                type="bare"
                label={label}
                disabled={isLast}
                className={`${isLast ? 'text-neutral-0' : 'text-dark-blue-0 hover:text-dark-blue-1 truncate'} transition-color`}
                {...buttonProps}
              />
              {!isLast && (
                <Icon
                  type="caret-right"
                  className="mx-2 text-neutral-2"
                  size="small"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;