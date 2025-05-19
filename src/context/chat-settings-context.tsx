
// src/context/chat-settings-context.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

export type MediaAutoDownloadSetting = 'wifi' | 'cellular' | 'never';

interface ChatSettingsContextType {
  readReceipts: boolean;
  setReadReceipts: (value: boolean) => void;
  notificationSound: boolean;
  setNotificationSound: (value: boolean) => void;
  enterToSend: boolean;
  setEnterToSend: (value: boolean) => void;
  mediaAutoDownload: MediaAutoDownloadSetting;
  setMediaAutoDownload: (value: MediaAutoDownloadSetting) => void;
}

const defaultChatSettings: ChatSettingsContextType = {
  readReceipts: true,
  setReadReceipts: () => {},
  notificationSound: true,
  setNotificationSound: () => {},
  enterToSend: false,
  setEnterToSend: () => {},
  mediaAutoDownload: 'wifi',
  setMediaAutoDownload: () => {},
};

const ChatSettingsContext = createContext<ChatSettingsContextType>(defaultChatSettings);

export function ChatSettingsProvider({ children }: { children: ReactNode }) {
  const [readReceipts, setReadReceiptsState] = useState<boolean>(defaultChatSettings.readReceipts);
  const [notificationSound, setNotificationSoundState] = useState<boolean>(defaultChatSettings.notificationSound);
  const [enterToSend, setEnterToSendState] = useState<boolean>(defaultChatSettings.enterToSend);
  const [mediaAutoDownload, setMediaAutoDownloadState] = useState<MediaAutoDownloadSetting>(defaultChatSettings.mediaAutoDownload);

  const setReadReceipts = useCallback((value: boolean) => setReadReceiptsState(value), []);
  const setNotificationSound = useCallback((value: boolean) => setNotificationSoundState(value), []);
  const setEnterToSend = useCallback((value: boolean) => setEnterToSendState(value), []);
  const setMediaAutoDownload = useCallback((value: MediaAutoDownloadSetting) => setMediaAutoDownloadState(value), []);

  return (
    <ChatSettingsContext.Provider value={{
      readReceipts,
      setReadReceipts,
      notificationSound,
      setNotificationSound,
      enterToSend,
      setEnterToSend,
      mediaAutoDownload,
      setMediaAutoDownload,
    }}>
      {children}
    </ChatSettingsContext.Provider>
  );
}

export function useChatSettings() {
  const context = useContext(ChatSettingsContext);
  if (context === undefined) {
    throw new Error('useChatSettings must be used within a ChatSettingsProvider');
  }
  return context;
}
