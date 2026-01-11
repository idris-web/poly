import type { ReactNode } from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import Navigation from './Navigation';

type NavigationMode = 'landing' | 'legal';

interface NavigationShellProps {
  mode?: NavigationMode;
  children?: ReactNode;
}

export default function NavigationShell({ mode = 'landing', children }: NavigationShellProps) {
  return (
    <LanguageProvider>
      <Navigation mode={mode} />
      {children}
    </LanguageProvider>
  );
}
