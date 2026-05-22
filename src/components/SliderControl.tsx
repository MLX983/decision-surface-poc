import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { SliderPosition } from '../types';
import {
  SLIDER_POSITION_MAX,
  SLIDER_POSITION_MIN,
  SLIDER_STEP_COUNT,
  clampSliderPosition,
  formatSliderPositionLabel,
} from '../utils/levels';

interface SliderControlProps {
  label: string;
  value: SliderPosition;
  onChange: (value: SliderPosition) => void;
}

function snapIndexFromPointer(
  clientX: number,
  track: DOMRect,
  thumbSize: number,
): SliderPosition {
  const x = clientX - track.left;
  const travel = track.width - thumbSize;
  const centers = Array.from(
    { length: SLIDER_STEP_COUNT },
    (_, i) => thumbSize / 2 + (travel * i) / SLIDER_POSITION_MAX,
  );
  let closest = 0;
  let minDist = Infinity;
  for (let i = 0; i < centers.length; i++) {
    const dist = Math.abs(x - centers[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  }
  return clampSliderPosition(closest);
}

export function SliderControl({ label, value, onChange }: SliderControlProps) {
  const index = value;
  const trackAreaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const trackArea = trackAreaRef.current;
      const trackEl = trackRef.current;
      if (!trackArea || !trackEl) return;
      const track = trackEl.getBoundingClientRect();
      const thumb = trackArea.querySelector<HTMLElement>('.slider-control__thumb');
      const thumbSize = thumb?.getBoundingClientRect().width ?? 0;
      if (thumbSize <= 0) return;
      onChange(snapIndexFromPointer(clientX, track, thumbSize));
    },
    [onChange],
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    function handlePointerMove(event: PointerEvent) {
      updateFromPointer(event.clientX);
    }

    function handlePointerUp() {
      endDrag();
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updateFromPointer, endDrag]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    setIsDragging(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange(clampSliderPosition(index - 1));
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onChange(clampSliderPosition(index + 1));
    }
  }

  return (
    <div className="slider-control">
      <p className="slider-control__label">{label}</p>
      <div
        ref={trackAreaRef}
        className={`slider-control__track-area${isDragging ? ' slider-control__track-area--dragging' : ''}`}
        data-slider-index={index}
        style={{ '--slider-index': index } as React.CSSProperties}
        role="slider"
        aria-label={label}
        aria-valuemin={SLIDER_POSITION_MIN}
        aria-valuemax={SLIDER_POSITION_MAX}
        aria-valuenow={index}
        aria-valuetext={formatSliderPositionLabel(index)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
      >
        <div ref={trackRef} className="slider-control__track">
          <div className="slider-control__track-fill" />
        </div>
        <div className="slider-control__thumb" aria-hidden="true" />
      </div>
      <div className="slider-control__scale" aria-hidden="true">
        <span>Low</span>
        <span>Med</span>
        <span>High</span>
      </div>
    </div>
  );
}
