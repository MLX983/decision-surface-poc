import { useEffect, useRef, useState, type ReactNode, type TransitionEvent } from 'react';

interface ScreenStackProps {
  base: ReactNode;
  overlay: ReactNode | null;
  /** Stable id — only re-run enter animation when this changes, not when overlay children update */
  overlayKey: string | null;
  isExiting: boolean;
  onExitComplete: () => void;
}

export function ScreenStack({
  base,
  overlay,
  overlayKey,
  isExiting,
  onExitComplete,
}: ScreenStackProps) {
  const [overlayEntered, setOverlayEntered] = useState(false);
  const isExitingRef = useRef(isExiting);

  useEffect(() => {
    isExitingRef.current = isExiting;
  }, [isExiting]);

  useEffect(() => {
    if (!overlayKey) {
      setOverlayEntered(false);
      return;
    }

    setOverlayEntered(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [overlayKey]);

  useEffect(() => {
    if (isExiting) {
      setOverlayEntered(false);
    }
  }, [isExiting]);

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'transform' || !isExitingRef.current) return;
    onExitComplete();
  }

  const overlayClassName = [
    'app-screen-stack__overlay',
    overlayEntered && !isExiting ? 'app-screen-stack__overlay--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`app-screen-stack${overlay ? ' app-screen-stack--layered' : ''}`}
    >
      <div className="app-screen-stack__base">{base}</div>
      {overlay && (
        <div
          className={overlayClassName}
          onTransitionEnd={handleTransitionEnd}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}
