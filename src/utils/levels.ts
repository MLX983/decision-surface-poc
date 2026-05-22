import type { Level, SliderPosition } from '../types';

const LEVELS: Level[] = ['low', 'medium', 'high'];

export const SLIDER_POSITION_MIN = 0;
export const SLIDER_POSITION_MAX = 4;
export const SLIDER_STEP_COUNT = 5;

export function clampSliderPosition(position: number): SliderPosition {
  const clamped = Math.max(
    SLIDER_POSITION_MIN,
    Math.min(SLIDER_POSITION_MAX, Math.round(position)),
  );
  return clamped as SliderPosition;
}

/** Maps a visual snap to the level used for recommendation logic. */
export function positionToLevel(position: SliderPosition): Level {
  if (position <= 1) return 'low';
  if (position === 2) return 'medium';
  return 'high';
}

export function levelToIndex(level: Level): number {
  return LEVELS.indexOf(level);
}

export function indexToLevel(index: number): Level {
  return LEVELS[index] ?? 'medium';
}

export function formatLevelLabel(level: Level): string {
  if (level === 'medium') return 'Med';
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function formatSliderPositionLabel(position: SliderPosition): string {
  switch (position) {
    case 0:
      return 'Low';
    case 1:
      return 'Between Low and Med';
    case 2:
      return 'Med';
    case 3:
      return 'Between Med and High';
    case 4:
      return 'High';
  }
}
