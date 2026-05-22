import type { WatchItem } from '../data/decisionSurfaceData';

type WatchlistCardVariant = 'alert' | 'normal';

interface WatchlistCardProps {
  item: WatchItem;
  variant?: WatchlistCardVariant;
  onViewInterpretations?: () => void;
  onViewPosture?: () => void;
}

export function WatchlistCard({
  item,
  variant = 'normal',
  onViewInterpretations,
  onViewPosture,
}: WatchlistCardProps) {
  const isAlertVariant = variant === 'alert';

  const statusClassName =
    item.status === 'Stalled' && isAlertVariant
      ? 'watchlist-card__line watchlist-card__line--warning'
      : 'watchlist-card__line watchlist-card__line--status';

  return (
    <article className="watchlist-card">
      <div className="watchlist-card__header">
        <h2 className="watchlist-card__title">{item.title}</h2>
      </div>

      <div className="watchlist-card__details">
        <div className="watchlist-card__row">
          <p className={statusClassName}>Status: {item.status}</p>
          <p className="watchlist-card__line">{item.summary}</p>
          <button
            type="button"
            className={`text-link text-link--watchlist${onViewInterpretations ? '' : ' text-link--inactive'}`}
            onClick={onViewInterpretations}
          >
            View interpretations
          </button>
        </div>

        <div className="watchlist-card__row">
          {isAlertVariant ? (
            <>
              <p className="watchlist-card__line watchlist-card__line--warning">
                {item.recommendationTitle}
              </p>
              {item.recommendationDetail && (
                <p className="watchlist-card__line">{item.recommendationDetail}</p>
              )}
            </>
          ) : (
            <>
              <p className="watchlist-card__line watchlist-card__line--label">
                Recommended approach
              </p>
              <p className="watchlist-card__line">{item.recommendationTitle}</p>
            </>
          )}
          <button
            type="button"
            className={`text-link text-link--watchlist${onViewPosture ? '' : ' text-link--inactive'}`}
            onClick={onViewPosture}
          >
            View posture
          </button>
        </div>
      </div>
    </article>
  );
}
