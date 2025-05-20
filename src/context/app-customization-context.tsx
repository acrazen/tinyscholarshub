
// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { UserRole } from '@/lib/types'; // Import UserRole

// Define module keys - these should match keys used in nav items and page links
export type AppModuleKey = 
  | 'messaging'
  | 'myLearning'
  | 'portfolio' // Represents the main portfolio link for parents
  | 'eventBooking'
  | 'resources'
  | 'statementOfAccount'
  | 'eService'
  | 'settings' // Settings might always be enabled
  | 'adminManageStudents' // Admin specific
  | 'teacherSmartUpdate'; // Teacher specific

export type ModuleSettings = Record<AppModuleKey, boolean>;

interface AppCustomizationContextType {
  appName: string;
  appIconUrl: string | null;
  primaryColor: string; // HSL string, e.g., "25 95% 55%"
  secondaryColor: string; // HSL string
  moduleSettings: ModuleSettings;
  currentUserRole: UserRole; // Added currentUserRole
  setAppName: (name: string) => void;
  setAppIconUrl: (url: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setModuleSettings: (settings: ModuleSettings) => void;
  toggleModule: (moduleKey: AppModuleKey) => void;
  setCurrentUserRole: (role: UserRole) => void; // Added setCurrentUserRole
}

const defaultAppName = "Tiny Scholars Hub";
const defaultIconUrl = null; 
const defaultPrimaryColor = "25 95% 55%"; // Playful Orange
const defaultSecondaryColor = "25 95% 75%"; // Light Playful Orange (derived from primary)

const defaultModuleSettings: ModuleSettings = {
  messaging: true,
  myLearning: true,
  portfolio: true,
  eventBooking: true,
  resources: true,
  statementOfAccount: true,
  eService: true,
  settings: true, // Typically always enabled
  adminManageStudents: true, // For admin roles
  teacherSmartUpdate: true, // For teacher roles
};

const AppCustomizationContext = createContext<AppCustomizationContextType | undefined>(undefined);

export function AppCustomizationProvider({ children }: { children: ReactNode }) {
  const [appName, setAppNameState] = useState<string>(defaultAppName);
  const [appIconUrl, setAppIconUrlState] = useState<string | null>(defaultIconUrl);
  const [primaryColor, setPrimaryColorState] = useState<string>(defaultPrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState<string>(defaultSecondaryColor);
  const [moduleSettings, setModuleSettingsState] = useState<ModuleSettings>(defaultModuleSettings);
  const [currentUserRole, setCurrentUserRoleState] = useState<UserRole>('Parent'); // Default to 'Parent'

  const setAppName = useCallback((name: string) => {
    setAppNameState(name || defaultAppName); 
  }, []);

  const setAppIconUrl = useCallback((url: string | null) => {
    setAppIconUrlState(url);
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    setPrimaryColorState(color || defaultPrimaryColor);
  }, []);

  const setSecondaryColor = useCallback((color: string) => {
    setSecondaryColorState(color || defaultSecondaryColor);
  }, []);

  const setModuleSettings = useCallback((settings: ModuleSettings) => {
    setModuleSettingsState(settings);
  }, []);

  const toggleModule = useCallback((moduleKey: AppModuleKey) => {
    setModuleSettingsState(prevSettings => ({
      ...prevSettings,
      [moduleKey]: !prevSettings[moduleKey],
    }));
  }, []);

  const setCurrentUserRole = useCallback((role: UserRole) => {
    setCurrentUserRoleState(role);
  }, []);

  return (
    <AppCustomizationContext.Provider value={{ 
      appName, 
      appIconUrl, 
      primaryColor,
      secondaryColor,
      moduleSettings,
      currentUserRole, // Provide role
      setAppName, 
      setAppIconUrl,
      setPrimaryColor,
      setSecondaryColor,
      setModuleSettings,
      toggleModule,
      setCurrentUserRole, // Provide role setter
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
