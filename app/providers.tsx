'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import ProgressSync from './components/ProgressSync';
import SettingsSync from './components/SettingsSync';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SettingsProvider>
          <SettingsSync />
          <ProgressSync />
          {children}
        </SettingsProvider>
      </AuthProvider>
    </Provider>
  );
}
