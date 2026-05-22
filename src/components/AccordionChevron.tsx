interface AccordionChevronProps {
  isOpen: boolean;
}

export function AccordionChevron({ isOpen }: AccordionChevronProps) {
  return (
    <svg
      className={`accordion-chevron${isOpen ? ' accordion-chevron--open' : ''}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6.5L8 10.5L12 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
