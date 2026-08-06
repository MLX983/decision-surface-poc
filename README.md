# Decision Surface POC

Decision Surface is a mobile-first proof of concept exploring how AI-assisted interfaces might help enterprise workers interpret ambiguous organizational signals before they become explicit project failures.

The prototype centers on a common workplace scenario: a meeting has just ended, and something shifted. Nobody clearly said “no,” but the project feels less stable. Finance requested more validation, Product softened timeline pressure, and Engineering clarified ownership boundaries.

Decision Surface helps the user review what changed, compare possible interpretations, adjust project posture settings, and receive context-aware recommended approaches.

## Repository

GitHub repository:

https://github.com/MLX983/decision-surface-poc.git

## Core Concept

Organizations often produce weak signals before problems become obvious.

Decision Surface provides a lightweight interface for:

- tracking watch items approaching or exceeding current posture settings
- reviewing signals detected from recent meetings or project activity
- comparing multiple plausible interpretations
- adjusting sensitivity and priorities
- receiving context-aware recommended approaches

The system does not make decisions for the user. It surfaces signals, explains possible interpretations, and recommends approaches based on human-defined project posture.

## Prototype Flow

```text
Watchlist → Interpretations → Posture adjustment → Updated Watchlist
```

## Screen 1: Watchlist

The Watchlist shows items approaching or exceeding current posture settings.

The primary scenario is “Vendor approval delay.” In the default state, the item is flagged because the latest meeting pushed the issue beyond the project’s current tolerance.

After the user adjusts posture settings, the same item updates with a calmer, more specific recommendation.

## Screen 2: Interpretations

The Interpretations screen helps the user understand what signal was detected and how it could be interpreted.

It includes:

- signal detected
- primary interpretation
- alternate interpretations
- watch-for cues
- reasoning details
- context used

The goal is to preserve ambiguity rather than collapse the meeting into one overly confident summary.

## Screen 3: Posture

The Posture screen lets the user adjust project-specific settings that shape how the system interprets signals.

It has two tabs:

- Sensitivity
- Priorities

The Sensitivity tab includes sliders for:

- Timeline sensitivity
- Scope flexibility
- Resource tolerance

The recommendation card updates immediately as slider settings change.

The Priorities tab shows the project-level goals and strategic tensions that influence the recommendation.

## Recommendation Behavior

The default posture is High timeline sensitivity, Medium scope flexibility,
and Medium resource tolerance. It resolves to the advisory
`reduceEscalation` state, so the initial Watchlist shows a short
`Consider posture change` warning. The fuller caution belongs on the Posture
screen.

The demonstration target is Medium / Medium / High. It resolves to the safe
`allowLimitedDrift` state, so the Watchlist shows the full recommended approach
without a warning.

Recommendation rules are evaluated in this order:

1. `surfaceBottleneck`: any timeline / Low scope / Low resources
2. `increaseVisibility`: High timeline / Low scope / Medium resources
3. `narrowScope`: High timeline / High scope / any resources
4. `clarifyOwnership`: High timeline / Medium scope / Low resources
5. `allowLimitedDrift`: any timeline / Medium scope / High resources
6. `reduceEscalation`: all remaining combinations

`postureSettings` contains the draft being explored on Posture.
`appliedPostureSettings` contains the posture reflected on Watchlist. Exiting
Posture applies the draft; refreshing resets both to the default.

## Design Principles

- Mobile-first
- Clear, focused product loop
- One strong calculator moment
- Human judgment remains central
- AI explains, contextualizes, and recommends
- Avoid task-manager or ticket-queue framing
- Avoid surveillance, emotion-detection, or psychological profiling language
- Use plain enterprise language

## Current Screens

- Screen 1 Default: Watchlist before posture adjustment
- Screen 2 Interpretations: Signal analysis and possible meanings
- Screen 3 Sensitivity: Slider-driven recommendation state
- Screen 3 Priorities: Project priorities and known tensions
- Screen 1 Updated: Watchlist after posture adjustment

The files in `design/screenshots` are historical reference artifacts and may
show the earlier High / Medium / Low default. The implementation and current
documentation are the source of truth for behavior and copy.

## Suggested Local Structure

```text
decision-surface-poc/
  README.md
  cursor-initial-prompt.md
  docs/
    product-brief.md
    functionality-details.md
  design/
    screenshots/
  src/
```

## Prototype Goal

The POC should demonstrate that a human can move from ambiguous signal detection to informed action.

The important interaction is not task completion. It is interpretive support under uncertainty.