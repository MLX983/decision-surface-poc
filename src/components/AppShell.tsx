import type { ReactNode } from 'react';
import { BackIcon } from './BackIcon';

interface AppShellProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children: ReactNode;
}

export function AppShell({ title, subtitle, onBack, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-shell__frame">
        <header
          className={`app-shell__header${onBack ? ' app-shell__header--with-back' : ''}`}
        >
          {onBack ? (
            <div className="app-shell__nav">
              <button
                type="button"
                className="app-shell__back"
                onClick={onBack}
                aria-label="Back"
              >
                <BackIcon />
              </button>
              <h1 className="app-shell__title app-shell__title--with-back">{title}</h1>
            </div>
          ) : (
            <h1 className="app-shell__title">{title}</h1>
          )}
          {subtitle && <p className="app-shell__subtitle">{subtitle}</p>}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
