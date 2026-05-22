export type Level = 'low' | 'medium' | 'high';

/** Visual snap index on a slider (0 = Low … 4 = High). */
export type SliderPosition = 0 | 1 | 2 | 3 | 4;

export type Screen = 'watchlist' | 'interpretations' | 'posture';

export type PostureTab = 'sensitivity' | 'priorities';

export interface PostureSettings {
  timelineSensitivity: SliderPosition;
  scopeFlexibility: SliderPosition;
  resourceTolerance: SliderPosition;
}

export type RecommendationStateKey =
  | 'clarifyOwnership'
  | 'narrowScope'
  | 'reduceEscalation'
  | 'allowLimitedDrift'
  | 'surfaceBottleneck'
  | 'increaseVisibility';
