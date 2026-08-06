import type {
  Level,
  PostureSettings,
  RecommendationStateKey,
} from '../types';
import { positionToLevel } from '../utils/levels';

export type RiskLevel = 'safe' | 'advisory';

export interface SemanticPostureLevels {
  timelineSensitivity: Level;
  scopeFlexibility: Level;
  resourceTolerance: Level;
}

export interface RecommendationState {
  title: string;
  approach: string;
  riskLevel: RiskLevel;
  getRationale: (levels: SemanticPostureLevels) => string[];
  watchlist?: {
    advisoryTitle: string;
    advisorySummary: string;
  };
  caution?: {
    title: string;
    getBody: (levels: SemanticPostureLevels) => string;
  };
}

export interface ResolvedRecommendation {
  key: RecommendationStateKey;
  title: string;
  approach: string;
  rationale: string[];
  riskLevel: RiskLevel;
  caution?: {
    title: string;
    body: string;
  };
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
    riskLevel: 'safe',
    getRationale: () => [
      'Current sensitivity settings place high weight on delivery predictability and low tolerance for unresolved handoffs.',
      'This aligns with current priorities to avoid unnecessary escalation, preserve cross-team trust, and increase delivery predictability.',
    ],
  },
  narrowScope: {
    title: 'Narrow scope',
    approach:
      'Protect the timeline by narrowing or staging scope while approval questions are resolved.',
    riskLevel: 'advisory',
    getRationale: () => [
      'Current sensitivity settings prioritize schedule stability and allow scope to flex before the timeline is put at risk.',
      'This aligns with current priorities to increase delivery predictability while avoiding unnecessary escalation over unresolved approval details.',
    ],
    watchlist: {
      advisoryTitle: WATCHLIST_CONSIDER_POSTURE_HEADER,
      advisorySummary:
        'Narrowing scope may protect the timeline, but it could leave the validation issue unresolved.',
    },
    caution: {
      title: 'Caution',
      getBody: () =>
        'Narrowing scope may protect the timeline, but it could leave the validation issue unresolved. Clarify approval criteria before treating this as the next action.',
    },
  },
  reduceEscalation: {
    title: 'Reduce escalation pressure',
    approach:
      'Reduce escalation pressure and clarify ownership through the next working session.',
    riskLevel: 'advisory',
    getRationale: () => [
      'Current sensitivity settings provide enough flexibility to resolve ambiguity without forcing escalation.',
      'This aligns with current priorities to preserve cross-team trust while improving delivery predictability through clearer ownership.',
    ],
    watchlist: {
      advisoryTitle: WATCHLIST_CONSIDER_POSTURE_HEADER,
      advisorySummary:
        'This posture may reduce pressure before ownership and validation criteria are clear.',
    },
    caution: {
      title: 'Caution',
      getBody: () =>
        'This posture may reduce pressure before ownership and validation criteria are clear. Review before applying it to the Watchlist.',
    },
  },
  allowLimitedDrift: {
    title: 'Allow limited drift',
    approach:
      'Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.',
    riskLevel: 'safe',
    getRationale: (levels) => [
      `${describeTimelineSensitivity(levels.timelineSensitivity)} timeline sensitivity, ${levels.scopeFlexibility} scope flexibility, and ${levels.resourceTolerance} resource tolerance allow the project to absorb a limited, bounded delay while validation criteria and ownership are clarified.`,
      'This preserves delivery predictability by making the delay intentional, bounded, and tied to clearer validation criteria.',
    ],
  },
  surfaceBottleneck: {
    title: 'Surface bottleneck',
    approach:
      'Surface this as a resourcing bottleneck and assign a clear validation owner.',
    riskLevel: 'safe',
    getRationale: () => [
      'Current sensitivity settings show low tolerance for added resource strain and limited ability to absorb unresolved handoffs.',
      'This aligns with current priorities to increase delivery predictability without framing the issue as stakeholder resistance.',
    ],
  },
  increaseVisibility: {
    title: 'Increase visibility',
    approach:
      'Increase visibility with a neutral summary of open validation questions and ownership gaps.',
    riskLevel: 'safe',
    getRationale: () => [
      'Current sensitivity settings indicate that ambiguity is nearing the limit of what the project can absorb without broader awareness.',
      'This aligns with current priorities to improve delivery predictability while reducing the risk that escalation is perceived as blame or pressure.',
    ],
  },
};

function describeTimelineSensitivity(level: Level): string {
  if (level === 'medium') return 'Moderate';
  return level === 'low' ? 'Low' : 'High';
}

export function getSemanticPostureLevels(
  settings: PostureSettings,
): SemanticPostureLevels {
  return {
    timelineSensitivity: positionToLevel(settings.timelineSensitivity),
    scopeFlexibility: positionToLevel(settings.scopeFlexibility),
    resourceTolerance: positionToLevel(settings.resourceTolerance),
  };
}

export function getWatchlistPrimaryDisplay(
  key: RecommendationStateKey,
): {
  variant: 'alert' | 'normal';
  title: string;
  detail?: string;
} {
  const state = recommendationStates[key];

  if (state.riskLevel === 'advisory' && state.watchlist) {
    return {
      variant: 'alert',
      title: state.watchlist.advisoryTitle,
      detail: state.watchlist.advisorySummary,
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
  const {
    timelineSensitivity,
    scopeFlexibility,
    resourceTolerance,
  } = getSemanticPostureLevels(settings);

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

export function getRecommendationForSettings(
  settings: PostureSettings,
): ResolvedRecommendation {
  const levels = getSemanticPostureLevels(settings);
  const key = getRecommendationState(settings);
  const state = recommendationStates[key];

  return {
    key,
    title: state.title,
    approach: state.approach,
    rationale: state.getRationale(levels),
    riskLevel: state.riskLevel,
    caution: state.caution
      ? {
          title: state.caution.title,
          body: state.caution.getBody(levels),
        }
      : undefined,
  };
}

/** Demo default — High / Med / Med → reduce escalation advisory */
export const defaultPostureSettings: PostureSettings = {
  timelineSensitivity: 4,
  scopeFlexibility: 2,
  resourceTolerance: 2,
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
