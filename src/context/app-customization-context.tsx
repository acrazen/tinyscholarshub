
// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface AppCustomizationContextType {
  appName: string;
  appIconUrl: string | null;
  setAppName: (name: string) => void;
  setAppIconUrl: (url: string | null) => void;
}

const defaultAppName = "Tiny Scholars Hub";
const defaultIconUrl = null; // No default custom icon, Logo component will use its fallback

const AppCustomizationContext = createContext<AppCustomizationContextType | undefined>(undefined);

export function AppCustomizationProvider({ children }: { children: ReactNode }) {
  const [appName, setAppNameState] = useState<string>(defaultAppName);
  const [appIconUrl, setAppIconUrlState] = useState<string | null>(defaultIconUrl);

  const setAppName = (name: string) => {
    setAppNameState(name || defaultAppName); // Fallback to default if empty
  };

  const setAppIconUrl = (url: string | null) => {
    setAppIconUrlState(url);
  };

  return (
    <AppCustomizationContext.Provider value={{ appName, appIconUrl, setAppName, setAppIconUrl }}>
      {children}
    </AppCustomizationContext.Provider>
  );
}

export function useAppCustomization() {
  const context = useContext(AppCustomizationContext);
  if (context === undefined) {
    throw new Error('useAppCustomization must be used within an AppCustomizationProvider');
  }
  return context;
}
