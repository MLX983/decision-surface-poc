export type WatchItemStatus = 'Stalled' | 'Unstable' | 'Drifting' | 'Fragile';

export interface WatchItem {
  id: string;
  title: string;
  status: WatchItemStatus;
  summary: string;
  recommendationTitle?: string;
  recommendationDetail?: string;
  isPrimary?: boolean;
}

export const watchlistMeta = {
  title: 'Watchlist',
  subtitle: 'Items approaching or exceeding current posture settings.',
} as const;

export const watchItems: WatchItem[] = [
  {
    id: 'vendor-approval-delay',
    title: 'Vendor approval delay',
    status: 'Stalled',
    summary: 'Finance team requested additional validation',
    isPrimary: true,
  },
  {
    id: 'scope-expansion-request',
    title: 'Scope expansion request',
    status: 'Unstable',
    summary: 'Engineering team stopped resisting timeline expansion',
    recommendationTitle: 'Clarify ownership',
  },
  {
    id: 'timeline-drift',
    title: 'Timeline drift',
    status: 'Drifting',
    summary: 'Leadership engagement decreased',
    recommendationTitle: 'Increase specificity',
  },
  {
    id: 'cross-team-alignment-risk',
    title: 'Cross-team alignment risk',
    status: 'Fragile',
    summary: 'Ownership language became indirect',
    recommendationTitle: 'Surface dependencies',
  },
];

export const interpretationsMeta = {
  title: 'Interpretations',
} as const;

export const signalDetected = {
  title: 'Signal detected',
  context: 'In latest meeting',
  bullets: [
    'Finance team requested additional validation',
    'Product team reduced timeline-pressure language',
    'Engineering team clarified ownership boundaries',
  ],
} as const;

export const primaryInterpretation = {
  label: 'Primary interpretation',
  title: 'Validation friction',
  body: 'Finance team is not rejecting the work. They are signaling that approval criteria or validation ownership are still unresolved.',
} as const;

export const alternateInterpretationsLabel = 'Alternate interpretations' as const;

export const alternateInterpretations = [
  {
    title: 'Resource constraint',
    body: 'The delay may be caused by limited Finance bandwidth rather than opposition to the work.',
    watchFor: [
      'Delayed follow-up',
      'Delegated attendance',
      'Vague timing commitments',
    ],
  },
  {
    title: 'Strategic delay',
    body: 'Finance team may be using review language to slow commitment while larger direction questions resolve.',
    watchFor: [
      'Repeated review loops without clear criteria',
      'No named decision owners',
      'Shifting rationale across meetings',
    ],
  },
  {
    title: 'Risk-management posture',
    body: 'The added scrutiny may reflect broader caution during a budget or exposure-review cycle.',
    watchFor: [
      'Similar caution across adjacent projects',
      'More requests for formal documentation',
      'Increased approval checkpoints',
    ],
  },
] as const;

export const reasoningAccordion = {
  label: 'Reasoning details',
  title: 'Reasoning signals',
  bullets: [
    'Increased validation requests over baseline',
    'No direct rejection language',
    'Discussion shifted from approval to review timing',
    'Speaking time redistributed toward Finance team members',
  ],
} as const;

export const contextAccordion = {
  label: 'Context used',
  items: [
    '6 prior team meetings',
    'Approval workflow history',
    'Project backlog + ownership map',
    'Q2 budget constraints',
    'Department roadmap alignment',
  ],
} as const;

export const postureMeta = {
  title: 'Posture',
} as const;

export const postureTabs = [
  { id: 'sensitivity' as const, label: 'Sensitivity' },
  { id: 'priorities' as const, label: 'Priorities' },
];

export const sensitivitySliders = [
  {
    id: 'timelineSensitivity' as const,
    label: 'Timeline sensitivity',
  },
  {
    id: 'scopeFlexibility' as const,
    label: 'Scope flexibility',
  },
  {
    id: 'resourceTolerance' as const,
    label: 'Resource tolerance',
  },
];

export const projectPriorities = {
  title: 'Project priorities',
  items: [
    'Avoid unnecessary escalation',
    'Preserve cross-team trust',
    'Increase delivery predictability',
  ],
} as const;

export const strategicTensions = {
  title: 'Known strategic tensions',
  items: [
    'Avoid timeline drift unless scope expansion improves long-term positioning',
    'Resolve ownership ambiguity before implementation scaling',
    'Preserve Finance alignment during budget review cycle',
  ],
} as const;
