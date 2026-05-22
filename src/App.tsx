import { useState } from 'react';
import { ScreenStack } from './components/ScreenStack';
import {
  defaultPostureSettings,
  getRecommendationState,
} from './data/recommendationStates';
import { InterpretationsScreen } from './screens/InterpretationsScreen';
import { PostureScreen } from './screens/PostureScreen';
import { WatchlistScreen } from './screens/WatchlistScreen';
import type { PostureSettings, PostureTab, Screen } from './types';

type OverlayScreen = Exclude<Screen, 'watchlist'>;

export default function App() {
  const [overlayScreen, setOverlayScreen] = useState<OverlayScreen | null>(
    null,
  );
  const [overlayExiting, setOverlayExiting] = useState(false);
  const [postureSettings, setPostureSettings] =
    useState<PostureSettings>(defaultPostureSettings);
  const [appliedPostureSettings, setAppliedPostureSettings] =
    useState<PostureSettings>(defaultPostureSettings);
  const [hasCommittedPosture, setHasCommittedPosture] = useState(false);
  const [postureTab, setPostureTab] = useState<PostureTab>('sensitivity');

  const watchlistRecommendationKey =
    getRecommendationState(appliedPostureSettings);

  function navigateTo(screen: OverlayScreen) {
    setOverlayExiting(false);
    setOverlayScreen(screen);
  }

  function navigateBack() {
    if (!overlayScreen) return;
    setOverlayExiting(true);
  }

  function handleOverlayExitComplete() {
    if (overlayScreen === 'posture') {
      setAppliedPostureSettings(postureSettings);
      setHasCommittedPosture(true);
    }
    setOverlayScreen(null);
    setOverlayExiting(false);
  }

  const overlay =
    overlayScreen === 'interpretations' ? (
      <InterpretationsScreen onBack={navigateBack} />
    ) : overlayScreen === 'posture' ? (
      <PostureScreen
        settings={postureSettings}
        activeTab={postureTab}
        onBack={navigateBack}
        onTabChange={setPostureTab}
        onSettingsChange={setPostureSettings}
      />
    ) : null;

  return (
    <ScreenStack
      base={
        <WatchlistScreen
          activeRecommendationKey={watchlistRecommendationKey}
          hasCommittedPosture={hasCommittedPosture}
          onViewInterpretations={() => navigateTo('interpretations')}
          onViewPosture={() => {
            setPostureTab('sensitivity');
            navigateTo('posture');
          }}
        />
      }
      overlay={overlay}
      overlayKey={overlayScreen}
      isExiting={overlayExiting}
      onExitComplete={handleOverlayExitComplete}
    />
  );
}
