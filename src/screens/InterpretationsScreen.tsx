import { AccordionSection } from '../components/AccordionSection';
import { AppShell } from '../components/AppShell';
import {
  alternateInterpretations,
  alternateInterpretationsLabel,
  contextAccordion,
  interpretationsMeta,
  primaryInterpretation,
  reasoningAccordion,
  signalDetected,
} from '../data/decisionSurfaceData';

interface InterpretationsScreenProps {
  onBack: () => void;
}

export function InterpretationsScreen({ onBack }: InterpretationsScreenProps) {
  return (
    <AppShell title={interpretationsMeta.title} onBack={onBack}>
      <div className="interpretations-body">
        <div className="interpretations-screen">
          <section className="signal-card">
            <h2 className="interpretation-section-heading">{signalDetected.title}</h2>
            <div className="signal-card__body">
              <p className="interpretation-block__subtitle">
                <strong>{signalDetected.context}</strong>
              </p>
              <ul className="signal-card__list">
                {signalDetected.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="interpretation-block">
            <h2 className="interpretation-section-heading">
              {primaryInterpretation.label}
            </h2>
            <div className="interpretation-block__subcard">
              <p className="interpretation-block__subtitle">
                <strong>{primaryInterpretation.title}</strong>
              </p>
              <div className="interpretation-detail">
                <p className="interpretation-detail__text">
                  {primaryInterpretation.body}
                </p>
              </div>
            </div>
          </section>

          <section className="interpretation-block">
            <h2 className="interpretation-section-heading">
              {alternateInterpretationsLabel}
            </h2>
            <div className="interpretation-block__alternates">
              {alternateInterpretations.map((alt) => (
                <div key={alt.title} className="interpretation-block__subcard">
                  <p className="interpretation-block__subtitle">
                    <strong>{alt.title}</strong>
                  </p>
                  <div className="interpretation-detail">
                    <p className="interpretation-detail__text">{alt.body}</p>
                    <div className="interpretation-block__watch-for">
                      <p className="interpretation-block__watch-for-label">
                        <strong>Watch for</strong>
                      </p>
                      <ul className="interpretation-detail__list">
                        {alt.watchFor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="interpretations-accordions">
          <AccordionSection label={reasoningAccordion.label}>
            <ul className="interpretation-detail__list">
              {reasoningAccordion.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection label={contextAccordion.label}>
            <ul className="context-links">
              {contextAccordion.items.map((item) => (
                <li key={item}>
                  <span className="context-links__item">{item}</span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>
      </div>
    </AppShell>
  );
}
