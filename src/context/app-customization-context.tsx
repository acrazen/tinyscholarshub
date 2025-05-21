
// src/context/app-customization-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserRole, AuthenticatedUser } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
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
  | 'adminManageStudents'
  | 'teacherSmartUpdate';

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

  tempSetUserRole: (role: UserRole) => void;
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
      // Supabase is not configured, so no auth state to check
      console.warn("AppCustomizationContext: Supabase client not available. Auth features disabled.");
      setIsLoadingAuth(false);
      setCurrentUser(null); // Ensure user is null if Supabase is not configured
      return;
    }

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // TODO: Fetch user's role from your 'profiles' table or custom claims
        const userRole = (session.user as any).app_role || 'Parent';
        setCurrentUser({
          ...session.user,
          id: session.user.id,
          role: userRole as UserRole
        });
      }
      setIsLoadingAuth(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        if (session?.user) {
          let userRole: UserRole = 'Parent';
          // Placeholder: you'd fetch the actual role from your DB or claims
          // Example: const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
          // if (profile) userRole = profile.role;
          setCurrentUser({
            ...session.user,
            id: session.user.id,
            role: userRole,
          });
        } else {
          setCurrentUser(null);
        }
        setIsLoadingAuth(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
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
      // For testing with no real user logged in, we can create a mock user
      if (!supabase) { // If Supabase isn't configured, we can still simulate this
         return {
            id: 'mock-user-id',
            email: 'mockuser@example.com',
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            role: role,
        };
      }
      return null; // Or handle as needed if no Supabase user
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
