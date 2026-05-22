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

Recommended approach
Consider posture change
Recent meeting signals exceed the project’s current tolerance.
View posture
```

### Updated Primary Card

After the user adjusts posture settings to the “Allow limited drift” state, the primary card should update to:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Recommended approach
Allow limited timeline drift while validation criteria and ownership are clarified.
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

For prototype simplicity, sliders should snap to three values:

```text
low
medium
high
```

The UI can visually appear continuous, but the logic should treat values as discrete bands.

### Recommendation Card

Card label:

```text
Recommended approach
```

Subsection label:

```text
Why this fits
```

The card content should update when slider settings cross into one of the defined states below.

Not every slider adjustment needs to produce a new recommendation. The system should feel stable and deterministic, not overly reactive.

## Recommendation States

### State 1: Clarify approval ownership

Slider settings:

- Timeline sensitivity: High
- Scope flexibility: Medium
- Resource tolerance: Low

Title:

```text
Clarify ownership
```

Recommended approach:

```text
Clarify approval ownership now to prevent avoidable timeline risk.
```

Why this fits:

- Current sensitivity settings place high weight on delivery predictability and low tolerance for unresolved handoffs.
- This aligns with current priorities to avoid unnecessary escalation, preserve cross-team trust, and increase delivery predictability.

### State 2: Narrow scope to protect timeline

Slider settings:

- Timeline sensitivity: High
- Scope flexibility: High
- Resource tolerance: Low or Medium

Title:

```text
Narrow scope
```

Recommended approach:

```text
Protect the timeline by narrowing or staging scope while approval questions are resolved.
```

Why this fits:

- Current sensitivity settings prioritize schedule stability and allow scope to flex before the timeline is put at risk.
- This aligns with current priorities to increase delivery predictability while avoiding unnecessary escalation over unresolved approval details.

### State 3: Reduce escalation pressure

Slider settings:

- Timeline sensitivity: Medium
- Scope flexibility: Medium
- Resource tolerance: Medium

Title:

```text
Reduce escalation pressure
```

Recommended approach:

```text
Reduce escalation pressure and clarify ownership through the next working session.
```

Why this fits:

- Current sensitivity settings indicate moderate timeline concern but enough flexibility to resolve ambiguity without forcing escalation.
- This aligns with current priorities to preserve cross-team trust while improving delivery predictability through clearer ownership.

### State 4: Allow limited timeline drift

Slider settings:

- Timeline sensitivity: Low or Medium
- Scope flexibility: Medium
- Resource tolerance: High

Title:

```text
Allow limited drift
```

Recommended approach:

```text
Allow limited timeline drift while validation criteria and ownership are clarified.
```

Why this fits:

- Current sensitivity settings allow the project to absorb some delay in exchange for stronger decision clarity.
- This aligns with current priorities to avoid unnecessary escalation, preserve Finance alignment, and prevent premature commitment.

### State 5: Surface resourcing bottleneck

Slider settings:

- Timeline sensitivity: Medium or High
- Scope flexibility: Low
- Resource tolerance: Low

Title:

```text
Surface bottleneck
```

Recommended approach:

```text
Surface this as a resourcing bottleneck and assign a clear validation owner.
```

Why this fits:

- Current sensitivity settings show low tolerance for added resource strain and limited ability to absorb unresolved handoffs.
- This aligns with current priorities to increase delivery predictability without framing the issue as stakeholder resistance.

### State 6: Increase visibility carefully

Slider settings:

- Timeline sensitivity: High
- Scope flexibility: Low
- Resource tolerance: Medium

Title:

```text
Increase visibility
```

Recommended approach:

```text
Increase visibility with a neutral summary of open validation questions and ownership gaps.
```

Why this fits:

- Current sensitivity settings indicate that ambiguity is nearing the limit of what the project can absorb without broader awareness.
- This aligns with current priorities to improve delivery predictability while reducing the risk that escalation is perceived as blame or pressure.

## Recommended Default and Demonstration States

### Default State

Use State 1 as the initial default for Screen 3.

```text
Timeline sensitivity: High
Scope flexibility: Medium
Resource tolerance: Low
```

Recommended approach:

```text
Clarify approval ownership now to prevent avoidable timeline risk.
```

### Updated State

Use State 4 as the adjusted state for the demonstration.

```text
Timeline sensitivity: Medium
Scope flexibility: Medium
Resource tolerance: High
```

Recommended approach:

```text
Allow limited timeline drift while validation criteria and ownership are clarified.
```

When the user returns to the Watchlist after this adjustment, the first card should show the updated recommendation.

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
- Slider changes auto-save.
- No Save or Cancel buttons.
- The recommendation card updates immediately as sliders change.
- The updated recommendation should be reflected on Screen 1.

## Interaction Requirements

### Slider Behavior

- Sliders should support three semantic values: Low, Medium, High.
- The visual thumb should align with label positions.
- Recommendation state should update only when the semantic value changes.
- Use a deterministic mapping from slider values to recommendation states.

### Recommended Mapping Priority

Because some combinations may overlap, evaluate states in this order:

1. Surface bottleneck
2. Increase visibility
3. Narrow scope
4. Clarify ownership
5. Allow limited drift
6. Reduce escalation pressure
7. Default fallback: Reduce escalation pressure

### Example Mapping Logic

```text
If resource tolerance is Low and scope flexibility is Low:
  Surface bottleneck

Else if timeline sensitivity is High and scope flexibility is Low and resource tolerance is Medium:
  Increase visibility

Else if timeline sensitivity is High and scope flexibility is High:
  Narrow scope

Else if timeline sensitivity is High and resource tolerance is Low:
  Clarify ownership

Else if resource tolerance is High and scope flexibility is Medium:
  Allow limited drift

Else:
  Reduce escalation pressure
```

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
currentScreen
timelineSensitivity
scopeFlexibility
resourceTolerance
activeRecommendationState
hasReviewedPosture
```

The prototype should prioritize clear cause and effect over feature completeness.