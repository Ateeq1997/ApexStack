import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';

export function SettingsPage() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const accentPreset = useAppStore((state) => state.accentPreset);
  const setAccentPreset = useAppStore((state) => state.setAccentPreset);
  const company = useAppStore((state) => state.company);
  const security = useAppStore((state) => state.security);
  const apiKeys = useAppStore((state) => state.apiKeys);
  const updateCompany = useAppStore((state) => state.updateCompany);
  const updateSecurity = useAppStore((state) => state.updateSecurity);

  const [companyForm, setCompanyForm] = useState(company);
  const [securityForm, setSecurityForm] = useState(security);

  const onCompanySave = (event: FormEvent) => {
    event.preventDefault();
    updateCompany(companyForm);
  };

  const onSecuritySave = (event: FormEvent) => {
    event.preventDefault();
    updateSecurity(securityForm);
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Settings Panel"
        description="Govern company profile, API credentials, and security policies."
        metrics={`${apiKeys.length} API keys configured`}
      />
      <Card title="Theme Customization" subtitle="Personalize look and feel for your admin workspace">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted">Current Mode</p>
            <p className="mt-1 text-sm font-bold uppercase">{theme}</p>
            <button className="mt-3 rounded-lg border px-3 py-1.5 text-xs font-semibold" onClick={toggleTheme}>
              Toggle Mode
            </button>
          </div>
          <div className="rounded-xl border p-3 md:col-span-2">
            <p className="text-xs text-muted">Accent Preset</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['ocean', 'emerald', 'amber'] as const).map((preset) => (
                <button
                  key={preset}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize ${
                    accentPreset === preset ? 'bg-[hsl(var(--accent-soft))] text-accent' : ''
                  }`}
                  onClick={() => setAccentPreset(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 xl:grid-cols-3">
      <Card title="Company Settings" className="xl:col-span-2">
        <form className="grid gap-3 md:grid-cols-2" onSubmit={onCompanySave}>
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            value={companyForm.name}
            onChange={(event) => setCompanyForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Company Name"
          />
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            value={companyForm.domain}
            onChange={(event) => setCompanyForm((prev) => ({ ...prev, domain: event.target.value }))}
            placeholder="Domain"
          />
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            value={companyForm.timezone}
            onChange={(event) => setCompanyForm((prev) => ({ ...prev, timezone: event.target.value }))}
            placeholder="Timezone"
          />
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            value={companyForm.supportEmail}
            onChange={(event) => setCompanyForm((prev) => ({ ...prev, supportEmail: event.target.value }))}
            placeholder="Support Email"
          />
          <Button className="md:col-span-2" type="submit">
            Save Company Settings
          </Button>
        </form>
      </Card>

      <Card title="API Keys UI" subtitle="Masked secrets">
        <div className="space-y-2">
          {apiKeys.map((key) => (
            <div key={key.id} className="rounded-lg border p-3 text-xs">
              <p className="font-semibold">{key.label}</p>
              <p className="mt-1 text-muted">{key.value}</p>
              <p className="mt-1 text-muted">created {key.createdAt}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Security Settings" className="xl:col-span-3">
        <form className="grid gap-3 md:grid-cols-3" onSubmit={onSecuritySave}>
          <label className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input
              type="checkbox"
              checked={securityForm.ssoEnabled}
              onChange={(event) => setSecurityForm((prev) => ({ ...prev, ssoEnabled: event.target.checked }))}
            />
            SSO Enabled
          </label>
          <label className="flex items-center gap-2 rounded-xl border p-3 text-sm">
            <input
              type="checkbox"
              checked={securityForm.mfaRequired}
              onChange={(event) => setSecurityForm((prev) => ({ ...prev, mfaRequired: event.target.checked }))}
            />
            MFA Required
          </label>
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            type="number"
            value={securityForm.sessionTimeoutMins}
            onChange={(event) =>
              setSecurityForm((prev) => ({ ...prev, sessionTimeoutMins: Number(event.target.value) || 0 }))
            }
            placeholder="Session timeout"
          />
          <Button className="md:col-span-3" type="submit">
            Save Security Settings
          </Button>
        </form>
      </Card>
      </div>
    </div>
  );
}
