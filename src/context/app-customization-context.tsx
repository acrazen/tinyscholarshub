
// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserRole, AuthenticatedUser } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import type { User as SupabaseAuthUser, Session } from '@supabase/supabase-js';


export type AppModuleKey =
  | 'messaging'
  | 'myLearning'
  | 'portfolio'
  | 'eventBooking'
  | 'resources'
  | 'statementOfAccount'
  | 'eService'
  | 'settings'
  | 'adminManageStudents' // SchoolAdmin feature
  | 'teacherSmartUpdate'  // Teacher feature
  | 'paymentGateway';     // New module for payments

export type ModuleSettings = Record<AppModuleKey, boolean>;

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
  paymentGateway: true, // Default to true, can be toggled by SuperAdmin/AppManager
};

interface AppCustomizationContextType {
  appName: string;
  appIconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  moduleSettings: ModuleSettings;

  currentUser: AuthenticatedUser | null;
  isLoadingAuth: boolean;

  setAppName: (name: string) => void;
  setAppIconUrl: (url: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setModuleSettings: (settings: ModuleSettings) => void;
  toggleModule: (moduleKey: AppModuleKey) => void;

  tempSetUserRole: (role: UserRole) => void; // For role simulation
}

const AppCustomizationContext = createContext<AppCustomizationContextType | undefined>(undefined);

export function AppCustomizationProvider({ children }: { children: ReactNode }) {
  const [appName, setAppNameState] = useState<string>(defaultAppName);
  const [appIconUrl, setAppIconUrlState] = useState<string | null>(defaultIconUrl);
  const [primaryColor, setPrimaryColorState] = useState<string>(defaultPrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState<string>(defaultSecondaryColor);
  const [moduleSettings, setModuleSettingsState] = useState<ModuleSettings>(defaultModuleSettings);

  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

 useEffect(() => {
    if (!supabase) {
      console.warn(
        "AppCustomizationContext: Supabase client not available or not configured. " +
        "Auth features will be disabled. Falling back to simulated user state."
      );
      setIsLoadingAuth(false);
      setCurrentUser({ // Default mock user if Supabase is not configured
          id: 'mock-parent-id',
          email: 'parent@example.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: 'Parent', // Default to Parent for basic app view
      });
      return;
    }

    const getSession = async () => {
      setIsLoadingAuth(true); // Start loading
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Error getting Supabase session:", sessionError);
      }

      if (session?.user) {
        let userRole: UserRole = 'Parent'; 
        if (session.user.email === 'superadmin@example.com') userRole = 'SuperAdmin';
        else if (session.user.email === 'appmanager@example.com') userRole = 'AppManager_Management';
        else if (session.user.email === 'sales@example.com') userRole = 'AppManager_Sales';
        else if (session.user.email === 'finance@example.com') userRole = 'AppManager_Finance';
        else if (session.user.email === 'support@example.com') userRole = 'AppManager_Support';
        else if (session.user.email === 'schooladmin@example.com') userRole = 'SchoolAdmin';
        else if (session.user.email === 'contenteditor@example.com') userRole = 'SchoolDataEditor';
        else if (session.user.email === 'schoolfinance@example.com') userRole = 'SchoolFinanceManager';
        else if (session.user.email === 'classteacher@example.com') userRole = 'ClassTeacher';
        else if (session.user.email === 'teacher@example.com') userRole = 'Teacher';

        setCurrentUser({
          id: session.user.id,
          email: session.user.email,
          app_metadata: session.user.app_metadata,
          user_metadata: session.user.user_metadata,
          aud: session.user.aud,
          created_at: session.user.created_at,
          role: userRole
        });
      } else {
        setCurrentUser(null);
      }
      setIsLoadingAuth(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoadingAuth(true); 
        if (session?.user) {
           let userRole: UserRole = 'Parent';
            if (session.user.email === 'superadmin@example.com') userRole = 'SuperAdmin';
            else if (session.user.email === 'appmanager@example.com') userRole = 'AppManager_Management';
            else if (session.user.email === 'sales@example.com') userRole = 'AppManager_Sales';
            else if (session.user.email === 'finance@example.com') userRole = 'AppManager_Finance';
            else if (session.user.email === 'support@example.com') userRole = 'AppManager_Support';
            else if (session.user.email === 'schooladmin@example.com') userRole = 'SchoolAdmin';
            else if (session.user.email === 'contenteditor@example.com') userRole = 'SchoolDataEditor';
            else if (session.user.email === 'schoolfinance@example.com') userRole = 'SchoolFinanceManager';
            else if (session.user.email === 'classteacher@example.com') userRole = 'ClassTeacher';
            else if (session.user.email === 'teacher@example.com') userRole = 'Teacher';

          setCurrentUser({
            id: session.user.id,
            email: session.user.email,
            app_metadata: session.user.app_metadata,
            user_metadata: session.user.user_metadata,
            aud: session.user.aud,
            created_at: session.user.created_at,
            role: userRole,
          });
        } else {
          setCurrentUser(null);
        }
        setIsLoadingAuth(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);


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

  const tempSetUserRole = useCallback((role: UserRole) => {
    setCurrentUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, role: role };
      }
      return {
        id: `mock-${role.toLowerCase()}-id`,
        email: `${role.toLowerCase()}@example.com`,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: role,
      };
    });
  }, []);


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
