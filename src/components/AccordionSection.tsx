import { useState, type ReactNode } from 'react';
import { AccordionChevron } from './AccordionChevron';

interface AccordionSectionProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionSection({
  label,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="accordion-section">
      <button
        type="button"
        className="accordion-section__trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="interpretation-section-heading accordion-section__label">
          {label}
        </span>
        <span className="accordion-section__chevron-wrap">
          <AccordionChevron isOpen={isOpen} />
        </span>
      </button>
      <div
        className={`accordion-section__panel-wrap${isOpen ? ' accordion-section__panel-wrap--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-section__panel">{children}</div>
      </div>
    </section>
  );
}
