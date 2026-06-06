'use client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  useSettings,
  type CodeLanguage,
  type FontSize,
} from '../contexts/SettingsContext';

const CODE_LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
];

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const FONT_SIZES: { id: FontSize; label: string }[] = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];
const APP_LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-outline-variant/30 bg-surface-container p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 py-3">
      <div>
        <p className="text-sm font-medium text-on-surface">{label}</p>
        {description && <p className="text-xs text-on-surface-variant">{description}</p>}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-primary"
      />
    </label>
  );
}

function OptionButtons<T extends string | number>({
  options,
  value,
  onChange,
  format,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-lg border px-4 py-2 text-sm transition ${
            value === opt
              ? 'border-primary/50 bg-primary/15 text-primary'
              : 'border-outline-variant/30 bg-surface-container-high text-on-surface-variant hover:border-primary/30'
          }`}
        >
          {format ? format(opt) : String(opt)}
        </button>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const settings = useSettings();
  const { loading, saving, isReady, error, updateSettings } = settings;

  if (!isReady || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-[240px] min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-[760px] space-y-6 p-8">
          <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />

          <section className="space-y-2">
            <h1 className="font-display text-4xl font-extrabold text-on-surface">
              <span className="text-primary">Settings</span>
            </h1>
            <p className="text-on-surface-variant">All preferences sync to your account.</p>
            {saving && <p className="text-sm text-primary">Saving…</p>}
            {error && <p className="text-sm text-red-400">Could not sync settings: {error}</p>}
          </section>

          <Section title="Appearance">
            <p className="text-xs text-on-surface-variant">
              Use the sun/moon icon in the header to switch light and dark mode.
            </p>
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">Font Size</label>
              <OptionButtons
                options={FONT_SIZES.map((f) => f.id)}
                value={settings.fontSize}
                onChange={(fontSize) => updateSettings({ fontSize })}
                format={(f) => FONT_SIZES.find((x) => x.id === f)?.label ?? f}
              />
            </div>
            <Toggle
              label="High Contrast"
              description="Increase text and border contrast"
              checked={settings.highContrast}
              onChange={(highContrast) => updateSettings({ highContrast })}
            />
            <Toggle
              label="Reduced Motion"
              description="Minimize animations across the app"
              checked={settings.reducedMotion}
              onChange={(reducedMotion) => updateSettings({ reducedMotion })}
            />
          </Section>

          <Section title="Learning">
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">App Language</label>
              <OptionButtons
                options={APP_LANGUAGES.map((l) => l.id)}
                value={settings.language}
                onChange={(language) => updateSettings({ language })}
                format={(l) => APP_LANGUAGES.find((x) => x.id === l)?.label ?? l}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">Animation Speed (default)</label>
              <OptionButtons
                options={SPEEDS}
                value={settings.animationSpeed}
                onChange={(animationSpeed) => updateSettings({ animationSpeed })}
                format={(s) => `${s}x`}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">Code Language</label>
              <div className="grid grid-cols-2 gap-2">
                {CODE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => updateSettings({ codeLanguage: lang.id })}
                    className={`rounded-lg border px-4 py-3 text-sm transition ${
                      settings.codeLanguage === lang.id
                        ? 'border-primary/50 bg-primary/15 text-primary'
                        : 'border-outline-variant/30 bg-surface-container-high text-on-surface-variant hover:border-primary/30'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">
                Daily Goal (minutes): {settings.dailyGoal}
              </label>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={settings.dailyGoal}
                onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">Reminder Time (optional)</label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => updateSettings({ reminderTime: e.target.value })}
                className="rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-2 text-sm text-on-surface"
              />
            </div>
            <Toggle
              label="Auto-play Visualizations"
              checked={settings.autoPlayVideos}
              onChange={(autoPlayVideos) => updateSettings({ autoPlayVideos })}
            />
          </Section>

          <Section title="Notifications">
            <Toggle
              label="Course Updates"
              checked={settings.emailNotifications.courseUpdates}
              onChange={(courseUpdates) =>
                updateSettings({ emailNotifications: { courseUpdates } })
              }
            />
            <Toggle
              label="Achievements"
              checked={settings.emailNotifications.achievements}
              onChange={(achievements) =>
                updateSettings({ emailNotifications: { achievements } })
              }
            />
            <Toggle
              label="Weekly Progress"
              checked={settings.emailNotifications.weeklyProgress}
              onChange={(weeklyProgress) =>
                updateSettings({ emailNotifications: { weeklyProgress } })
              }
            />
            <Toggle
              label="Marketing"
              checked={settings.emailNotifications.marketing}
              onChange={(marketing) => updateSettings({ emailNotifications: { marketing } })}
            />
          </Section>

          <Section title="Privacy">
            <div className="space-y-2">
              <label className="block text-sm text-on-surface-variant">Profile Visibility</label>
              <OptionButtons
                options={['public', 'private'] as const}
                value={settings.profileVisibility}
                onChange={(profileVisibility) => updateSettings({ profileVisibility })}
                format={(v) => (v === 'public' ? 'Public' : 'Private')}
              />
            </div>
            <Toggle
              label="Show Progress on Profile"
              checked={settings.showProgress}
              onChange={(showProgress) => updateSettings({ showProgress })}
            />
            <Toggle
              label="Show Achievements on Profile"
              checked={settings.showAchievements}
              onChange={(showAchievements) => updateSettings({ showAchievements })}
            />
          </Section>
        </div>
      </main>
    </>
  );
}
