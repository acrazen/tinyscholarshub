
// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserRole, AuthenticatedUser } from '@/lib/types'; // Import UserRole & AuthenticatedUser

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

// Simulating a basic authenticated user structure
// In a real app, this would come from Supabase auth
const MOCK_SUPER_ADMIN_USER: AuthenticatedUser = {
  id: 'super-admin-001',
  email: 'super@example.com',
  role: 'SuperAdmin',
};

const MOCK_PARENT_USER: AuthenticatedUser = {
  id: 'parent-user-123',
  email: 'parent@example.com',
  role: 'Parent',
  schoolId: 'school-01' // Example school ID
};


interface AppCustomizationContextType {
  appName: string;
  appIconUrl: string | null;
  primaryColor: string; 
  secondaryColor: string; 
  moduleSettings: ModuleSettings;
  
  // Simulated Auth State
  currentUser: AuthenticatedUser | null; 
  isLoadingAuth: boolean;
  
  setAppName: (name: string) => void;
  setAppIconUrl: (url: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setModuleSettings: (settings: ModuleSettings) => void;
  toggleModule: (moduleKey: AppModuleKey) => void;

  // Simulated Auth functions
  loginAs: (role: UserRole) => void; // Simplified login for role switching
  logout: () => void;
  tempSetUserRole: (role: UserRole) => void; // For super admin role switcher
}

const defaultAppName = "Tiny Scholars Hub";
const defaultIconUrl = null; 
const defaultPrimaryColor = "25 95% 55%"; 
const defaultSecondaryColor = "25 95% 75%";

const defaultModuleSettings: ModuleSettings = {
  messaging: true,
  myLearning: true,
  portfolio: true,
  eventBooking: true,
  resources: true,
  statementOfAccount: true,
  eService: true,
  settings: true,
  adminManageStudents: true, 
  teacherSmartUpdate: true, 
};

const AppCustomizationContext = createContext<AppCustomizationContextType | undefined>(undefined);

export function AppCustomizationProvider({ children }: { children: ReactNode }) {
  const [appName, setAppNameState] = useState<string>(defaultAppName);
  const [appIconUrl, setAppIconUrlState] = useState<string | null>(defaultIconUrl);
  const [primaryColor, setPrimaryColorState] = useState<string>(defaultPrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState<string>(defaultSecondaryColor);
  const [moduleSettings, setModuleSettingsState] = useState<ModuleSettings>(defaultModuleSettings);
  
  // Simulated Auth State
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(MOCK_PARENT_USER); // Default to parent
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);


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

  // Simulated login function - in real app, this would call Supabase
  const loginAs = useCallback((role: UserRole) => {
    setIsLoadingAuth(true);
    // Simulate API call
    setTimeout(() => {
      // Create a mock user based on role for simulation
      let mockUser: AuthenticatedUser = { id: 'mock-user', role: role, email: `${role.toLowerCase()}@example.com`};
      if (role === 'SuperAdmin') mockUser = MOCK_SUPER_ADMIN_USER;
      else if (role === 'Parent') mockUser = MOCK_PARENT_USER;
      else if (role === 'SchoolAdmin') mockUser = {id: 'school-admin-01', email: 'schooladmin@example.com', role: 'SchoolAdmin', schoolId: 'school-01'};
      else if (role === 'ClassTeacher') mockUser = {id: 'class-teacher-01', email: 'classteacher@example.com', role: 'ClassTeacher', schoolId: 'school-01'};
      
      setCurrentUser(mockUser);
      setIsLoadingAuth(false);
    }, 500);
  }, []);

  const logout = useCallback(() => {
    setIsLoadingAuth(true);
    setTimeout(() => {
      setCurrentUser(null);
      setIsLoadingAuth(false);
    }, 500);
  }, []);

  const tempSetUserRole = useCallback((role: UserRole) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? ({ ...prev, role }) : null);
    } else {
      // If no user, simulate logging in as that role
      loginAs(role);
    }
  }, [currentUser, loginAs]);


  return (
    <AppCustomizationContext.Provider value={{ 
      appName, 
      appIconUrl, 
      primaryColor,
      secondaryColor,
      moduleSettings,
      currentUser,
      isLoadingAuth,
      setAppName, 
      setAppIconUrl,
      setPrimaryColor,
      setSecondaryColor,
      setModuleSettings,
      toggleModule,
      loginAs,
      logout,
      tempSetUserRole,
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
