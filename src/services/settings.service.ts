import type { ClientSettings, ClientSettingsPatch } from '@/lib/settings.types';

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

interface SettingsApiResponse {
  settings: ClientSettings;
}

export async function getUserSettings(): Promise<ClientSettings> {
  const response = await fetch('/api/user/settings', {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to load settings');
  }

  const data: SettingsApiResponse = await response.json();
  return data.settings;
}

export async function updateUserSettings(patch: ClientSettingsPatch): Promise<ClientSettings> {
  const response = await fetch('/api/user/settings', {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Failed to update settings');
  }

  const data: SettingsApiResponse = await response.json();
  return data.settings;
}
