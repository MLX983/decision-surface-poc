# Functionality Details: Decision Surface POC

## Purpose

This document defines the core prototype behavior, screen content, slider logic, and recommendation card states for the Decision Surface POC.

The prototype should demonstrate a focused loop:

```text
Watchlist → Interpretations → Posture adjustment → Updated Watchlist
```

## Screen 1: Watchlist

### Purpose

Show items approaching or exceeding current posture settings.

These are not tasks or tickets. They are watch items where the system thinks human review may be useful.

### Page Title

```text
Watchlist
```

### Subtitle

```text
Items approaching or exceeding current posture settings.
```

### Default Primary Card

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Consider posture change
This posture may reduce pressure before ownership and validation criteria are clear.
View posture
```

This is the short Watchlist summary for the default `reduceEscalation`
advisory state. The full caution and tradeoff analysis belongs on the Posture
screen.

### Updated Primary Card

After the user adjusts posture settings to the “Allow limited drift” state, the primary card should update to:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Recommended approach
Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.
View posture
```

### Other Watchlist Cards

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

## Screen 2: Interpretations

### Purpose

Show what signal was detected and how it could be interpreted.

The point of this screen is to preserve ambiguity while still offering a useful primary interpretation.

### Page Title

```text
Interpretations
```

### Signal Card

```text
Signal detected

In latest meeting
- Finance team requested additional validation
- Product team reduced timeline-pressure language
- Engineering team clarified ownership boundaries
```

### Primary Interpretation

```text
Primary interpretation

Validation friction

Finance team is not rejecting the work. They are signaling that approval criteria or validation ownership are still unresolved.
```

### Alternate Interpretations

```text
Alternate interpretations

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

### Accordion: Reasoning Details

Collapsed label:

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

### Accordion: Context Used

Collapsed label:

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

### Purpose

Let the user define what matters for this project, then see how recommendations change.

The user is not making a final decision here. The user is adjusting project posture: sensitivity settings and priorities that shape how the system interprets signals.

### Page Title

```text
Posture
```

### Tabs

```text
Sensitivity
Priorities
```

## Screen 3: Sensitivity Tab

### Sliders

Use three sliders:

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

### Slider Values

The visual sliders use five snap positions grouped into three semantic levels:

```text
Positions 0–1: Low
Position 2: Medium
Positions 3–4: High
```

Recommendation mapping uses the semantic level, not the raw visual position.

### Recommendation Card

Card label:

```text
Recommended approach
```

Subsection label:

```text
Rationale
```

The card content should update when slider settings cross into one of the defined states below.

Not every slider adjustment needs to produce a new recommendation. The system should feel stable and deterministic, not overly reactive.

## Recommendation Mapping

The mapping is evaluated in order. Order matters because some rules overlap;
the first matching rule wins.

1. `surfaceBottleneck`: any timeline / Low scope / Low resources
2. `increaseVisibility`: High timeline / Low scope / Medium resources
3. `narrowScope`: High timeline / High scope / any resources
4. `clarifyOwnership`: High timeline / Medium scope / Low resources
5. `allowLimitedDrift`: any timeline / Medium scope / High resources
6. `reduceEscalation`: all remaining combinations

### State Content and Classification

- `surfaceBottleneck` — safe. “Surface this as a resourcing bottleneck and assign a clear validation owner.”
- `increaseVisibility` — safe. “Increase visibility with a neutral summary of open validation questions and ownership gaps.”
- `narrowScope` — advisory. The Posture screen warns that narrowing scope could leave validation unresolved; the Watchlist shows the shorter `Consider posture change` summary.
- `clarifyOwnership` — safe. “Clarify approval ownership now to prevent avoidable timeline risk.”
- `allowLimitedDrift` — safe. “Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.”
- `reduceEscalation` — advisory. The Posture screen warns that reducing pressure may be premature; the Watchlist shows the shorter `Consider posture change` summary.

Rationale content is resolved from the active semantic posture levels. In
particular, `allowLimitedDrift` describes the active timeline level together
with Medium scope flexibility and High resource tolerance.

## Safe and Advisory Presentation

### Safe State

Posture screen:

- recommended approach
- rationale
- normal visual treatment

Watchlist:

- `Recommended approach`
- full approach text
- `View posture`

### Advisory State

Posture screen:

- concise caution card explaining the problem with the current posture
- orange caution treatment

Watchlist:

- `Consider posture change`
- short warning summary
- `View posture`

The Watchlist warning is intentionally shorter than the Posture analysis. Do
not copy the full recommendation, rationale, or caution body into the
Watchlist.

## Default and Demonstration States

### Default State

```text
Timeline sensitivity: High
Scope flexibility: Medium
Resource tolerance: Medium
Recommendation state: reduceEscalation
Classification: advisory
```

The initial Watchlist therefore shows `Consider posture change` and the short
`reduceEscalation` warning summary. Opening Posture shows the same High /
Medium / Medium posture and its orange caution card.

### Demonstration Target

```text
Timeline sensitivity: Medium
Scope flexibility: Medium
Resource tolerance: High
Recommendation state: allowLimitedDrift
Classification: safe
```

When the viewer exits Posture with this selection, the first Watchlist card
shows:

```text
Recommended approach
Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.
View posture
```

## Screen 3: Priorities Tab

### Purpose

Show the project-level guidance that helps the AI recommendation fit the real-world context.

Project priorities should be human-defined.

Known strategic tensions may be system-suggested from project history and context, but should be editable by the user or team.

### Project Priorities

```text
Project priorities

1. Avoid unnecessary escalation
2. Preserve cross-team trust
3. Increase delivery predictability
```

### Known Strategic Tensions

```text
Known strategic tensions

- Avoid timeline drift unless scope expansion improves long-term positioning
- Resolve ownership ambiguity before implementation scaling
- Preserve Finance alignment during budget review cycle
```

## Navigation

### Screen 1

- Tapping “View interpretations” on the first card opens Screen 2.
- Tapping “View posture” on the first card opens Screen 3.

### Screen 2

- Back arrow returns to Screen 1.
- No edit actions are required on this screen for the initial prototype.

### Screen 3

- Back arrow returns to Screen 1.
- No Save or Cancel buttons.
- Slider changes update the draft recommendation immediately.
- Exiting Posture applies the draft posture to the Watchlist.
- Reopening Posture preserves the selected slider values.

## Interaction Requirements

### Slider Behavior

- Sliders should support three semantic values: Low, Medium, High.
- The visual thumb should align with label positions.
- Recommendation state should update only when the semantic value changes.
- Use a deterministic mapping from slider values to recommendation states.

### Draft and Applied Posture

- `postureSettings` contains the slider values currently being explored on the Posture screen.
- `appliedPostureSettings` contains the posture currently reflected on the Watchlist.
- Both start from the same High / Medium / Medium default.
- Posture resolves recommendation content from `postureSettings` immediately.
- Watchlist resolves its display from `appliedPostureSettings`.
- Exiting Posture copies `postureSettings` to `appliedPostureSettings`.
- Refreshing the prototype resets both values to the default; persistence is not implemented.

Both screens use the same ordered recommendation mapping documented above.
There is no pre-commit warning override.

## Visual Direction

- Mobile-first layout
- Clean, sparse UI
- Blue for active links, titles, and selected tabs
- Pale blue for system-generated recommendation cards
- Subtle dividers between watchlist items
- Orange emphasis only for threshold-crossing recommendation
- Avoid dense dashboard styling
- Avoid enterprise admin-console complexity

## Implementation Notes

This POC can be implemented using React + Vite with static data and local state only.

No backend is required.

Suggested components:

```text
App
WatchlistScreen
InterpretationsScreen
PostureScreen
SegmentedTabs
SliderControl
RecommendationCard
WatchItemCard
AccordionSection
```

Suggested data files:

```text
src/data/watchItems.ts
src/data/recommendationStates.ts
src/state/posture.ts
```

Suggested state:

```text
overlayScreen
postureSettings
appliedPostureSettings
postureTab
```

Recommendation titles, approaches, rationale generation, caution content, and
Watchlist advisory summaries live in
`src/data/recommendationStates.ts`. Screen components render the resolved
content and do not own recommendation-domain language.

The prototype should prioritize clear cause and effect over feature completeness.