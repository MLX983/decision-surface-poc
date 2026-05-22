interface CautionCardProps {
  title: string;
  body: string;
}

export function CautionCard({ title, body }: CautionCardProps) {
  return (
    <section className="caution-card" aria-live="polite">
      <p className="caution-card__title">{title}</p>
      <p className="caution-card__body">{body}</p>
    </section>
  );
}
