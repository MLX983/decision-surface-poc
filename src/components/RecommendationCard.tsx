import type { ResolvedRecommendation } from '../data/recommendationStates';

interface RecommendationCardProps {
  state: ResolvedRecommendation;
}

export function RecommendationCard({ state }: RecommendationCardProps) {
  return (
    <section className="recommendation-card" aria-live="polite">
      <p className="recommendation-card__label">
        <strong>Recommended approach</strong>
      </p>
      <p className="recommendation-card__approach">{state.approach}</p>
      <div className="recommendation-card__rationale">
        <p className="recommendation-card__rationale-label">
          <strong>Rationale</strong>
        </p>
        <ul className="recommendation-card__rationale-list">
          {state.rationale.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
