// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface AppCustomizationContextType {
  appName: string;
  appIconUrl: string | null;
  primaryColor: string; // HSL string, e.g., "25 95% 55%"
  secondaryColor: string; // HSL string
  setAppName: (name: string) => void;
  setAppIconUrl: (url: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

const defaultAppName = "Tiny Scholars Hub";
const defaultIconUrl = null; 
const defaultPrimaryColor = "25 95% 55%"; // Default Orange
const defaultSecondaryColor = "25 95% 75%"; // Default Light Orange (was Teal: "190 70% 50%")

const AppCustomizationContext = createContext<AppCustomizationContextType | undefined>(undefined);

export function AppCustomizationProvider({ children }: { children: ReactNode }) {
  const [appName, setAppNameState] = useState<string>(defaultAppName);
  const [appIconUrl, setAppIconUrlState] = useState<string | null>(defaultIconUrl);
  const [primaryColor, setPrimaryColorState] = useState<string>(defaultPrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState<string>(defaultSecondaryColor);

  const setAppName = (name: string) => {
    setAppNameState(name || defaultAppName); 
  };

  const setAppIconUrl = (url: string | null) => {
    setAppIconUrlState(url);
  };

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color || defaultPrimaryColor);
  };

  const setSecondaryColor = (color: string) => {
    setSecondaryColorState(color || defaultSecondaryColor);
  };

  return (
    <AppCustomizationContext.Provider value={{ 
      appName, 
      appIconUrl, 
      primaryColor,
      secondaryColor,
      setAppName, 
      setAppIconUrl,
      setPrimaryColor,
      setSecondaryColor
    }}>
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
