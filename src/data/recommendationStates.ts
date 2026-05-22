import { primaryWatchItemDefaults } from './decisionSurfaceData';
import type { PostureSettings, RecommendationStateKey } from '../types';
import { positionToLevel } from '../utils/levels';

export type RiskLevel = 'safe' | 'advisory';

export interface RecommendationState {
  title: string;
  approach: string;
  reasons: string[];
  riskLevel: RiskLevel;
  watchlistHeader?: string;
  watchlistBody?: string;
  warningTitle?: string;
  warningBody?: string;
}

export const WATCHLIST_CONSIDER_POSTURE_HEADER = 'Consider posture change';

export const recommendationStates: Record<
  RecommendationStateKey,
  RecommendationState
> = {
  clarifyOwnership: {
    title: 'Clarify ownership',
    approach:
      'Clarify approval ownership now to prevent avoidable timeline risk.',
    reasons: [
      'Current sensitivity settings place high weight on delivery predictability and low tolerance for unresolved handoffs.',
      'This aligns with current priorities to avoid unnecessary escalation, preserve cross-team trust, and increase delivery predictability.',
    ],
    riskLevel: 'safe',
  },
  narrowScope: {
    title: 'Narrow scope',
    approach:
      'Protect the timeline by narrowing or staging scope while approval questions are resolved.',
    reasons: [
      'Current sensitivity settings prioritize schedule stability and allow scope to flex before the timeline is put at risk.',
      'This aligns with current priorities to increase delivery predictability while avoiding unnecessary escalation over unresolved approval details.',
    ],
    riskLevel: 'advisory',
    watchlistHeader: WATCHLIST_CONSIDER_POSTURE_HEADER,
    watchlistBody:
      'Narrowing scope may protect the timeline, but it could leave the validation issue unresolved.',
    warningTitle: 'Caution',
    warningBody:
      'Narrowing scope may protect the timeline, but it could leave the validation issue unresolved. Clarify approval criteria before treating this as the next action.',
  },
  reduceEscalation: {
    title: 'Reduce escalation pressure',
    approach:
      'Reduce escalation pressure and clarify ownership through the next working session.',
    reasons: [
      'Current sensitivity settings indicate moderate timeline concern but enough flexibility to resolve ambiguity without forcing escalation.',
      'This aligns with current priorities to preserve cross-team trust while improving delivery predictability through clearer ownership.',
    ],
    riskLevel: 'advisory',
    watchlistHeader: WATCHLIST_CONSIDER_POSTURE_HEADER,
    watchlistBody:
      'This posture may reduce pressure before ownership and validation criteria are clear.',
    warningTitle: 'Caution',
    warningBody:
      'This posture may reduce pressure before ownership and validation criteria are clear. Review before applying it to the Watchlist.',
  },
  allowLimitedDrift: {
    title: 'Allow limited drift',
    approach:
      'Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.',
    reasons: [
      'Although timeline sensitivity may be high, resource tolerance allows a limited adjustment if it prevents premature commitment.',
      'This preserves delivery predictability by making the delay intentional, bounded, and tied to clearer validation criteria.',
    ],
    riskLevel: 'safe',
  },
  surfaceBottleneck: {
    title: 'Surface bottleneck',
    approach:
      'Surface this as a resourcing bottleneck and assign a clear validation owner.',
    reasons: [
      'Current sensitivity settings show low tolerance for added resource strain and limited ability to absorb unresolved handoffs.',
      'This aligns with current priorities to increase delivery predictability without framing the issue as stakeholder resistance.',
    ],
    riskLevel: 'safe',
  },
  increaseVisibility: {
    title: 'Increase visibility',
    approach:
      'Increase visibility with a neutral summary of open validation questions and ownership gaps.',
    reasons: [
      'Current sensitivity settings indicate that ambiguity is nearing the limit of what the project can absorb without broader awareness.',
      'This aligns with current priorities to improve delivery predictability while reducing the risk that escalation is perceived as blame or pressure.',
    ],
    riskLevel: 'safe',
  },
};

export function isAdvisoryRecommendation(
  key: RecommendationStateKey,
): boolean {
  return recommendationStates[key].riskLevel === 'advisory';
}

export function getWatchlistPrimaryDisplay(
  key: RecommendationStateKey,
  hasCommittedPosture: boolean,
): {
  variant: 'alert' | 'normal';
  title: string;
  detail?: string;
} {
  if (!hasCommittedPosture) {
    return {
      variant: 'alert',
      title: primaryWatchItemDefaults.recommendationTitle,
      detail: primaryWatchItemDefaults.recommendationDetail,
    };
  }

  const state = recommendationStates[key];

  if (state.riskLevel === 'advisory') {
    return {
      variant: 'alert',
      title: state.watchlistHeader ?? WATCHLIST_CONSIDER_POSTURE_HEADER,
      detail: state.watchlistBody,
    };
  }

  return {
    variant: 'normal',
    title: state.approach,
  };
}

export function getRecommendationState(
  settings: PostureSettings,
): RecommendationStateKey {
  const timelineSensitivity = positionToLevel(settings.timelineSensitivity);
  const scopeFlexibility = positionToLevel(settings.scopeFlexibility);
  const resourceTolerance = positionToLevel(settings.resourceTolerance);

  if (resourceTolerance === 'low' && scopeFlexibility === 'low') {
    return 'surfaceBottleneck';
  }

  if (
    timelineSensitivity === 'high' &&
    scopeFlexibility === 'low' &&
    resourceTolerance === 'medium'
  ) {
    return 'increaseVisibility';
  }

  if (timelineSensitivity === 'high' && scopeFlexibility === 'high') {
    return 'narrowScope';
  }

  if (timelineSensitivity === 'high' && resourceTolerance === 'low') {
    return 'clarifyOwnership';
  }

  if (resourceTolerance === 'high' && scopeFlexibility === 'medium') {
    return 'allowLimitedDrift';
  }

  return 'reduceEscalation';
}

/** Demo default — High / Med / Low → alert watchlist state */
export const defaultPostureSettings: PostureSettings = {
  timelineSensitivity: 4,
  scopeFlexibility: 2,
  resourceTolerance: 0,
};

/** Demo target — Med / Med / High → updated primary watchlist card */
export const demoUpdatedPostureSettings: PostureSettings = {
  timelineSensitivity: 2,
  scopeFlexibility: 2,
  resourceTolerance: 4,
};

/** High / High / Med or Low → narrow scope advisory */
export const demoNarrowScopePostureSettings: PostureSettings = {
  timelineSensitivity: 4,
  scopeFlexibility: 4,
  resourceTolerance: 2,
};
