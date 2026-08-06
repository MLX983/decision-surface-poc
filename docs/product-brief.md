# Product Brief: Decision Surface POC

## Working Title

Decision Surface

## One-Sentence Summary

Decision Surface is a mobile-first concept that helps enterprise workers review ambiguous organizational signals, compare possible interpretations, adjust project posture settings, and receive context-aware recommended approaches.

## Problem

Enterprise projects often drift before they fail.

After a meeting, teams may sense that something changed:

- a stakeholder requested more validation
- ownership became less clear
- timeline urgency softened
- approval language shifted
- teams avoided direct disagreement
- decision criteria became unstable

These signals are often subtle. They may appear across meetings, emails, project docs, roadmaps, budgets, backlog activity, or informal communication.

Existing tools often treat these moments as:

- meeting summaries
- tasks
- project status updates
- sentiment analysis
- escalation workflows

But the user’s real need is interpretive:

> What changed, what might it mean, and how should I respond?

## Target User

A mid-level enterprise worker navigating ambiguous cross-functional projects.

The user is not assumed to be:

- an executive
- a people manager
- a project administrator
- a governance operator

The user is someone responsible for moving work forward while navigating unclear ownership, shifting priorities, and competing stakeholder concerns.

## Core User Scenario

The user has just left a meeting about a vendor approval delay.

No one directly blocked the project, but several signals suggest the issue has changed:

- Finance requested additional validation
- Product reduced timeline-pressure language
- Engineering clarified ownership boundaries

The system detects that this watch item is approaching or exceeding current project posture settings.

The user reviews the signal, considers multiple interpretations, adjusts posture sensitivity, and receives an updated recommended approach.

## Product Thesis

Organizations generate ambiguous signals before explicit failure.

A useful AI system should help humans:

- detect emerging signals
- interpret possible meanings
- understand uncertainty
- compare alternate explanations
- adjust recommendations based on project priorities
- act more deliberately

The system should not pretend certainty or make decisions automatically.

## What This POC Is

Decision Surface is:

- a decision-support surface
- a signal interpretation tool
- a project posture and recommendation interface
- a human-AI judgment aid
- a way to explore organizational ambiguity before it becomes operational failure

## What This POC Is Not

Decision Surface is not:

- a meeting summary tool
- a task manager
- a ticket queue
- a sentiment analysis dashboard
- a psychological profiling tool
- an automated escalation system
- a manager approval workflow

## Key Value Propositions

### 1. Detect emerging watch items

The system identifies items approaching or exceeding current posture settings.

### 2. Preserve ambiguity

The system shows multiple plausible interpretations rather than forcing a single confident answer.

### 3. Support human judgment

The user can inspect reasoning and decide whether to adjust posture or act.

### 4. Connect recommendations to context

Recommendations are based on signals, sensitivity settings, project priorities, and known strategic tensions.

### 5. Make posture visible

The user can see how different sensitivity settings change the recommended approach.

## Prototype Screens

### Screen 1: Watchlist

Purpose:

Show items approaching or exceeding current posture settings.

Primary content:

- watch item title
- status
- recent signal summary
- link to interpretations
- recommended approach
- link to posture

Default primary item:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Consider posture change
This posture may reduce pressure before ownership and validation criteria are clear.
View posture
```

This short warning reflects the applied High / Medium / Medium posture, which
resolves to the advisory `reduceEscalation` state. The warning stays concise so
the viewer opens Posture for the full analysis.

Updated primary item:

```text
Vendor approval delay

Status: Stalled
Finance team requested additional validation
View interpretations

Recommended approach
Allow a tightly bounded timeline adjustment while validation criteria and ownership are clarified.
View posture
```

### Screen 2: Interpretations

Purpose:

Show what signal was detected and how it could be interpreted.

Primary content:

- signal detected
- primary interpretation
- alternate interpretations
- watch-for cues
- reasoning details
- context used

Core message:

The signal can be interpreted in multiple ways. The system recommends a primary interpretation, but preserves alternate explanations for human review.

### Screen 3: Posture

Purpose:

Let the user adjust project-specific sensitivity settings and see how the recommended approach changes.

Tabs:

- Sensitivity
- Priorities

Sensitivity controls:

- Timeline sensitivity
- Scope flexibility
- Resource tolerance

Recommendation card:

- Recommended approach
- Rationale

Safe states use the normal recommendation treatment. Advisory states use an
orange caution card that explains why the current posture needs review.

The Posture sliders are a draft until the viewer exits Posture. Slider changes
update Posture immediately; exiting applies the selected posture to the
Watchlist. Reopening preserves the selected values, while refreshing resets the
prototype to High / Medium / Medium.

Priorities tab content:

Project priorities:

1. Avoid unnecessary escalation
2. Preserve cross-team trust
3. Increase delivery predictability

Known strategic tensions:

- Avoid timeline drift unless scope expansion improves long-term positioning
- Resolve ownership ambiguity before implementation scaling
- Preserve Finance alignment during budget review cycle

## UX Principles

### Keep the loop small

The prototype should feel like a small, complete product moment.

```text
Watchlist → Interpretations → Posture → Updated Watchlist
```

### Avoid overclaiming

Use language like:

- signal detected
- interpretation
- recommended approach
- context used
- watch for
- current posture settings

Avoid language like:

- truth
- diagnosis
- personality analysis
- emotion detection
- behavioral profile
- certain outcome

### Make AI legible but not magical

The system should appear to use:

- latest meeting signals
- prior meetings
- approval workflow history
- backlog and ownership map
- budget constraints
- roadmap alignment

But the UI should not overexpose raw machinery.

### Human owns the decision

The AI provides interpretation and recommendations. The human decides what to do.

## Success Criteria

The POC succeeds if a viewer quickly understands:

1. The system is tracking ambiguous project signals.
2. The latest meeting changed the interpretation of a watch item.
3. The system shows multiple plausible interpretations.
4. The user can adjust project posture settings.
5. The recommendation changes based on those settings and project priorities.
6. The updated Watchlist reflects a calmer, more specific recommendation.

## Portfolio Framing

Suggested portfolio description:

> Decision Surface is a mobile-first concept for reviewing ambiguous organizational signals. It tracks watch items near project posture thresholds, shows multiple interpretations of recent signals, and lets the user tune sensitivity and priorities to generate context-aware recommendations.