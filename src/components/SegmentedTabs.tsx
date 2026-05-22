interface TabOption<T extends string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
}

export function SegmentedTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
}: SegmentedTabsProps<T>) {
  return (
    <div className="segmented-tabs" role="tablist" aria-label="Posture sections">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`segmented-tabs__tab${isActive ? ' segmented-tabs__tab--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
