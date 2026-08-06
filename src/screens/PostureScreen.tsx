import { CautionCard } from '../components/CautionCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { SliderControl } from '../components/SliderControl';
import { AppShell } from '../components/AppShell';
import {
  postureMeta,
  postureTabs,
  projectPriorities,
  sensitivitySliders,
  strategicTensions,
} from '../data/decisionSurfaceData';
import { getRecommendationForSettings } from '../data/recommendationStates';
import type { PostureSettings, PostureTab } from '../types';

interface PostureScreenProps {
  settings: PostureSettings;
  activeTab: PostureTab;
  onBack: () => void;
  onTabChange: (tab: PostureTab) => void;
  onSettingsChange: (settings: PostureSettings) => void;
}

export function PostureScreen({
  settings,
  activeTab,
  onBack,
  onTabChange,
  onSettingsChange,
}: PostureScreenProps) {
  const recommendation = getRecommendationForSettings(settings);

  function updateSetting<K extends keyof PostureSettings>(
    key: K,
    value: PostureSettings[K],
  ) {
    onSettingsChange({ ...settings, [key]: value });
  }

  return (
    <AppShell title={postureMeta.title} onBack={onBack}>
      <div className="posture-screen">
        <SegmentedTabs
          tabs={postureTabs}
          activeTab={activeTab}
          onChange={onTabChange}
        />

        {activeTab === 'sensitivity' && (
          <div className="posture-screen__panel" role="tabpanel">
            <div className="posture-screen__sliders">
              {sensitivitySliders.map((slider) => (
                <SliderControl
                  key={slider.id}
                  label={slider.label}
                  value={settings[slider.id]}
                  onChange={(value) => updateSetting(slider.id, value)}
                />
              ))}
            </div>
            <div className="posture-screen__recommendations">
              {recommendation.caution ? (
                <CautionCard
                  title={recommendation.caution.title}
                  body={recommendation.caution.body}
                />
              ) : (
                <RecommendationCard state={recommendation} />
              )}
            </div>
          </div>
        )}

        {activeTab === 'priorities' && (
          <div className="posture-screen__panel" role="tabpanel">
            <section className="priorities-section">
              <div className="priorities-section__header">
                <h2 className="priorities-section__title">
                  {projectPriorities.title}
                </h2>
                <button type="button" className="priorities-section__edit">
                  Edit
                </button>
              </div>
              <ol className="priorities-section__list">
                {projectPriorities.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            <section className="priorities-section">
              <div className="priorities-section__header">
                <h2 className="priorities-section__title">
                  {strategicTensions.title}
                </h2>
                <button type="button" className="priorities-section__edit">
                  Edit
                </button>
              </div>
              <ul className="priorities-section__bullets">
                {strategicTensions.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </AppShell>
  );
}
