
// src/app/(main)/messages/layout.tsx
"use client"; // Required for context provider

import { ChatSettingsProvider } from '@/context/chat-settings-context';
import type { ReactNode } from 'react';

export default function MessagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ChatSettingsProvider>
      {children}
    </ChatSettingsProvider>
  );
}
