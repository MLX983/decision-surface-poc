import { AppShell } from '../components/AppShell';
import { WatchlistCard } from '../components/WatchlistCard';
import {
  watchItems,
  watchlistMeta,
  type WatchItem,
} from '../data/decisionSurfaceData';
import { getWatchlistPrimaryDisplay } from '../data/recommendationStates';
import type { RecommendationStateKey } from '../types';

interface WatchlistScreenProps {
  activeRecommendationKey: RecommendationStateKey;
  hasCommittedPosture: boolean;
  onViewInterpretations: () => void;
  onViewPosture: () => void;
}

function resolveWatchItems(
  activeRecommendationKey: RecommendationStateKey,
  hasCommittedPosture: boolean,
): WatchItem[] {
  const primaryDisplay = getWatchlistPrimaryDisplay(
    activeRecommendationKey,
    hasCommittedPosture,
  );

  return watchItems.map((item) => {
    if (!item.isPrimary) {
      return item;
    }

    return {
      ...item,
      recommendationTitle: primaryDisplay.title,
      recommendationDetail: primaryDisplay.detail,
    };
  });
}

export function WatchlistScreen({
  activeRecommendationKey,
  hasCommittedPosture,
  onViewInterpretations,
  onViewPosture,
}: WatchlistScreenProps) {
  const items = resolveWatchItems(activeRecommendationKey, hasCommittedPosture);
  const primaryDisplay = getWatchlistPrimaryDisplay(
    activeRecommendationKey,
    hasCommittedPosture,
  );

  return (
    <AppShell title={watchlistMeta.title} subtitle={watchlistMeta.subtitle}>
      <div className="watchlist-screen__list">
        {items.map((item) => (
          <WatchlistCard
            key={item.id}
            item={item}
            variant={item.isPrimary ? primaryDisplay.variant : 'normal'}
            onViewInterpretations={
              item.isPrimary ? onViewInterpretations : undefined
            }
            onViewPosture={item.isPrimary ? onViewPosture : undefined}
          />
        ))}
      </div>
    </AppShell>
  );
}
