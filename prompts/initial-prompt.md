# Cursor Initial Prompt: Build Decision Surface POC

You are helping build a mobile-first React + Vite proof of concept called Decision Surface.

GitHub repository:

https://github.com/MLX983/decision-surface-poc.git

This is a static frontend prototype. No backend is required. Use local React state and static data.

## Product Summary

Decision Surface helps an enterprise worker review ambiguous organizational signals, compare possible interpretations, adjust project posture settings, and receive context-aware recommended approaches.

The core prototype loop is:

```text
Watchlist → Interpretations → Posture adjustment → Updated Watchlist
```

The key interaction is on the Posture screen: sliders update a recommendation card. When the user returns to the Watchlist, the primary watch item reflects the updated recommendation.

## Technical Preferences

Use:

- React
- TypeScript if the project is already configured for it
- Vite
- CSS modules or plain CSS
- static data
- local component state

Do not add:

- backend
- database
- authentication
- external APIs
- complex routing
- state management libraries unless absolutely necessary

The prototype should be mobile-first. On desktop, center the prototype in a phone-sized frame.

## Suggested App Structure

```text
src/
  App.tsx
  components/
    AccordionSection.tsx
    RecommendationCard.tsx
    SegmentedTabs.tsx
    SliderControl.tsx
    WatchItemCard.tsx
  screens/
    WatchlistScreen.tsx
    InterpretationsScreen.tsx
    PostureScreen.tsx
  data/
    watchItems.ts
    recommendationStates.ts
  styles/
    tokens.css
    global.css
```

Use a simpler structure if that better fits the current project. Prioritize clarity.

## Screens to Build

## Screen 1: Watchlist

Title:

```text
Watchlist
```

Subtitle:

```text
Items approaching or exceeding current posture settings.
```

Show four watch item cards.

Primary default card:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Consider posture change
This posture may reduce pressure before ownership and validation criteria are clear.
View posture
```

The warning is intentionally short. The full caution and recommendation
analysis belongs on the Posture screen.

After posture adjustment, this card should update to:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Recommended approach
Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.
View posture
```

Other cards:

```text
Scope expansion request

Status: Unstable
Engineering team stopped resisting timeline expansion
View interpretations

Recommended approach
Clarify ownership
View posture
```

```text
Timeline drift

Status: Drifting
Leadership engagement decreased
View interpretations

Recommended approach
Increase specificity
View posture
```

```text
Cross-team alignment risk

Status: Fragile
Ownership language became indirect
View interpretations

Recommended approach
Surface dependencies
View posture
```

Interactions:

- “View interpretations” on the first card opens Screen 2.
- “View posture” on the first card opens Screen 3.

## Screen 2: Interpretations

Title:

```text
Interpretations
```

Back arrow returns to Watchlist.

Signal card:

```text
Signal detected

In latest meeting
- Finance team requested additional validation
- Product team reduced timeline-pressure language
- Engineering team clarified ownership boundaries
```

Primary interpretation:

```text
Primary interpretation

Validation friction

Finance team is not rejecting the work. They are signaling that approval criteria or validation ownership are still unresolved.
```

Alternate interpretations:

```text
Resource constraint

The delay may be caused by limited Finance bandwidth rather than opposition to the work.

Watch for
- Delayed follow-up
- Delegated attendance
- Vague timing commitments
```

```text
Strategic delay

Finance team may be using review language to slow commitment while larger direction questions resolve.

Watch for
- Repeated review loops without clear criteria
- No named decision owners
- Shifting rationale across meetings
```

```text
Risk-management posture

The added scrutiny may reflect broader caution during a budget or exposure-review cycle.

Watch for
- Similar caution across adjacent projects
- More requests for formal documentation
- Increased approval checkpoints
```

Accordion 1:

Label:

```text
Reasoning details
```

Expanded content:

```text
Reasoning signals
- Increased validation requests over baseline
- No direct rejection language
- Discussion shifted from approval to review timing
- Speaking time redistributed toward Finance team members
```

Accordion 2:

Label:

```text
Context used
```

Expanded content:

```text
6 prior team meetings
Approval workflow history
Project backlog + ownership map
Q2 budget constraints
Department roadmap alignment
```

## Screen 3: Posture

Title:

```text
Posture
```

Back arrow returns to Watchlist.

Tabs:

```text
Sensitivity
Priorities
```

Default active tab:

```text
Sensitivity
```

## Sensitivity Tab

Sliders:

```text
Timeline sensitivity
Low / Med / High
```

```text
Scope flexibility
Low / Med / High
```

```text
Resource tolerance
Low / Med / High
```

The UI uses five visual snap positions mapped to three semantic values:

```ts
type Level = "low" | "medium" | "high";

// positions 0–1 → low
// position 2 → medium
// positions 3–4 → high
```

Initial values:

```ts
timelineSensitivity = "high";
scopeFlexibility = "medium";
resourceTolerance = "medium";
```

Initial recommendation state:

```text
Reduce escalation pressure (advisory)
```

Recommendation card labels:

```text
Recommended approach
Rationale
```

Card content should update based on slider state.

## Recommendation States

Centralize recommendation-domain content in
`src/data/recommendationStates.ts`. State definitions should own titles,
approaches, risk classification, rationale generation, caution content, and
short Watchlist summaries:

```ts
interface RecommendationState {
  title: string;
  approach: string;
  riskLevel: "safe" | "advisory";
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
```

Screen components should render resolved content rather than own
recommendation-domain language.

## Recommendation Mapping Logic

Evaluate rules in this order; the first match wins:

1. `surfaceBottleneck`: any timeline / Low scope / Low resources
2. `increaseVisibility`: High timeline / Low scope / Medium resources
3. `narrowScope`: High timeline / High scope / any resources
4. `clarifyOwnership`: High timeline / Medium scope / Low resources
5. `allowLimitedDrift`: any timeline / Medium scope / High resources
6. `reduceEscalation`: all remaining combinations

The implementation is equivalent to:

```ts
function getRecommendationState({
  timelineSensitivity,
  scopeFlexibility,
  resourceTolerance
}) {
  if (resourceTolerance === "low" && scopeFlexibility === "low") {
    return "surfaceBottleneck";
  }

  if (
    timelineSensitivity === "high" &&
    scopeFlexibility === "low" &&
    resourceTolerance === "medium"
  ) {
    return "increaseVisibility";
  }

  if (timelineSensitivity === "high" && scopeFlexibility === "high") {
    return "narrowScope";
  }

  if (timelineSensitivity === "high" && resourceTolerance === "low") {
    return "clarifyOwnership";
  }

  if (resourceTolerance === "high" && scopeFlexibility === "medium") {
    return "allowLimitedDrift";
  }

  return "reduceEscalation";
}
```

## Demonstration State

The prototype should allow the user to move from default state to updated state.

Default:

```text
Timeline sensitivity: High
Scope flexibility: Medium
Resource tolerance: Medium
```

Recommendation state:

```text
reduceEscalation (advisory)
```

Updated:

```text
Timeline sensitivity: Medium
Scope flexibility: Medium
Resource tolerance: High
```

Recommendation:

```text
Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.
```

When the user returns to Watchlist after the recommendation state becomes `allowLimitedDrift`, update the first Watchlist card to show that recommendation.

## Safe and Advisory Presentation

Safe states show the recommended approach and rationale with normal treatment
on Posture. Their Watchlist display shows `Recommended approach`, the approach
text, and `View posture`.

Advisory states show a concise orange caution card on Posture. Their Watchlist
display shows `Consider posture change`, a short warning summary, and
`View posture`. Keep this Watchlist summary shorter than the Posture analysis.

## Draft and Applied Posture

- `postureSettings` is the draft currently being explored on Posture.
- `appliedPostureSettings` is the posture currently reflected on Watchlist.
- Slider changes update Posture immediately.
- Exiting Posture copies the draft to the applied posture.
- Reopening Posture preserves the selected values.
- Refreshing resets both values to High / Medium / Medium.
- Both screens use the same recommendation mapping; do not add a pre-commit warning override.

## Priorities Tab

Content:

```text
Project priorities

1. Avoid unnecessary escalation
2. Preserve cross-team trust
3. Increase delivery predictability
```

```text
Known strategic tensions

- Avoid timeline drift unless scope expansion improves long-term positioning
- Resolve ownership ambiguity before implementation scaling
- Preserve Finance alignment during budget review cycle
```

Add small “Edit” links on the right side of the section headings. They do not need to function in this prototype.

## Styling Direction

Use a simple mobile-first interface.

Visual direction:

- white app background
- blue for active links, titles, and selected tab
- pale blue card background for AI/system-generated recommendation content
- subtle dividers between watchlist items
- simple back arrow
- large readable type
- generous spacing
- no desktop dashboard styling

Approximate colors:

```css
--blue: #0057d8;
--blue-soft: #e8f2ff;
--text: #333333;
--muted: #666666;
--border: #dddddd;
--warning: #c75b12;
--page-bg: #ffffff;
```

## Important Product Behavior

The product should not feel like:

- a task manager
- a ticket queue
- a meeting summary app
- a surveillance tool
- an automated escalation tool

It should feel like:

- a decision-support surface
- a signal interpretation tool
- a project posture tuning tool
- a human judgment aid

## Implementation Goal

Build the screens and interactions cleanly. Prioritize the core loop and deterministic slider behavior over polish.

The first working version should show:

1. Watchlist default state
2. Interpretations screen
3. Posture screen with working sliders and recommendation card
4. Priorities tab
5. Updated Watchlist state after posture changes