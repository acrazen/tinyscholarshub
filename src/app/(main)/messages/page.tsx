// src/app/(main)/messages/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Paperclip, Search, Settings2, ArrowLeft } from 'lucide-react';
import type { Conversation, ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const sampleConversations: Conversation[] = [
  {
    id: 'convo1',
    participantName: 'Ms. Emily (Butterflies)',
    participantRole: 'Teacher',
    lastMessage: "Don't forget the field trip form for Leo!",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    avatarUrl: 'https://picsum.photos/seed/teacher1/100/100',
    unreadCount: 2,
  },
  {
    id: 'convo2',
    participantName: 'Mr. John (Caterpillars)',
    participantRole: 'Teacher',
    lastMessage: "Mia had a great day today, she really enjoyed the story time.",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    avatarUrl: 'https://picsum.photos/seed/teacher2/100/100',
  },
  {
    id: 'convo3',
    participantName: 'School Admin',
    participantRole: 'Administration',
    lastMessage: "Reminder: School fees are due next Friday.",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    avatarUrl: 'https://picsum.photos/seed/admin/100/100',
    unreadCount: 1,
  },
];

const sampleMessages: Record<string, ChatMessage[]> = {
  convo1: [
    { id: 'msg1-1', sender: 'other', text: "Hi Sarah, just a reminder about Leo's field trip form. Please send it by tomorrow if possible!", timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), avatarUrl: 'https://picsum.photos/seed/teacher1/100/100' },
    { id: 'msg1-2', sender: 'user', text: "Oh, thanks for the reminder Ms. Emily! I'll get that in today.", timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString() },
    { id: 'msg1-3', sender: 'other', text: "Great, thank you!", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), avatarUrl: 'https://picsum.photos/seed/teacher1/100/100' },
  ],
  convo2: [
    { id: 'msg2-1', sender: 'other', text: "Mia had a great day today, she really enjoyed the story time about the little blue truck.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), avatarUrl: 'https://picsum.photos/seed/teacher2/100/100' },
  ],
  convo3: [
     { id: 'msg3-1', sender: 'other', text: "Dear Parents, a friendly reminder: School fees are due next Friday. Please ensure payments are made on time. Thank you!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), avatarUrl: 'https://picsum.photos/seed/admin/100/100' },
  ]
};


export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(sampleConversations[0]?.id || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversationId) {
      setMessages(sampleMessages[selectedConversationId] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversationId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    // Also update sampleMessages for persistence in this demo
    if (sampleMessages[selectedConversationId]) {
        sampleMessages[selectedConversationId].push(newMsg);
    } else {
        sampleMessages[selectedConversationId] = [newMsg];
    }
    // Update conversation's last message for the sidebar
    const convoIndex = sampleConversations.findIndex(c => c.id === selectedConversationId);
    if (convoIndex !== -1) {
        sampleConversations[convoIndex].lastMessage = newMessage;
        sampleConversations[convoIndex].lastMessageTimestamp = new Date().toISOString();
    }
    setNewMessage('');
  };

  const selectedConversation = sampleConversations.find(c => c.id === selectedConversationId);

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,8rem))] md:h-[calc(100vh-var(--header-height,5rem)-2rem)]"> {/* Adjusted height calculation */}
      <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
        <h1 className="text-2xl font-bold flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> Messages</h1>
        <Button variant="ghost" size="icon"><Settings2 className="h-5 w-5" /></Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Conversation List */}
        <aside className={cn(
          "w-full md:w-1/3 lg:w-1/4 border-r border-border flex flex-col bg-card",
          selectedConversationId && "hidden md:flex" 
        )}>
          <div className="p-4 border-b border-border hidden md:block">
             <h1 className="text-xl font-semibold flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary" /> Messages</h1>
          </div>
          <div className="p-2">
            <div className="relative">
              <Input placeholder="Search messages..." className="pl-8 bg-background" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {sampleConversations.map(convo => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={cn(
                  "flex items-center w-full p-3 hover:bg-muted/50 transition-colors text-left",
                  selectedConversationId === convo.id && "bg-muted"
                )}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={convo.avatarUrl} alt={convo.participantName} data-ai-hint="person avatar" />
                  <AvatarFallback>{convo.participantName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm truncate">{convo.participantName}</h3>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(convo.lastMessageTimestamp), 'p')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unreadCount && convo.unreadCount > 0 && (
                  <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {convo.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className={cn(
          "flex-1 flex flex-col bg-background",
          !selectedConversationId && "hidden md:flex"
        )}>
          {selectedConversation ? (
            <>
              <header className="p-4 border-b border-border bg-card flex items-center space-x-3">
                 <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSelectedConversationId(null)}>
                    <ArrowLeft className="h-5 w-5"/>
                 </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.participantName} data-ai-hint="person chat avatar" />
                  <AvatarFallback>{selectedConversation.participantName.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedConversation.participantName}</h2>
                  <p className="text-xs text-muted-foreground">{selectedConversation.participantRole || 'Online'}</p>
                </div>
              </header>
              <ScrollArea className="flex-1 p-4">
                {messages.map(msg => (
                  <div key={msg.id} className={cn(
                    "flex items-end space-x-2 mb-2", // Reduced margin from mb-4 to mb-2
                    msg.sender === 'user' ? "justify-end" : ""
                  )}>
                    {msg.sender === 'other' && (
                      <Avatar className="h-8 w-8 self-start">
                        <AvatarImage src={msg.avatarUrl} data-ai-hint="chat participant avatar"/>
                        <AvatarFallback>{selectedConversation.participantName.substring(0,1)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn(
                      "p-3 rounded-xl max-w-xs lg:max-w-md break-words shadow",
                      msg.sender === 'user' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border border-border" // Use border-border
                    )}>
                      <p className="text-sm">{msg.text}</p>
                       <p className={cn("text-xs mt-1", msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left')}>
                        {format(new Date(msg.timestamp), 'p')}
                      </p>
                    </div>
                     {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8 self-start">
                        <AvatarImage src={sampleUserProfile.profilePhotoUrl} data-ai-hint="my avatar"/>
                        <AvatarFallback>{sampleUserProfile.name.substring(0,1)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card flex items-center space-x-2">
                <Button variant="ghost" size="icon" type="button">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-background focus-visible:ring-1 focus-visible:ring-primary"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={newMessage.trim() === ''}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <MessageSquare className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground">Select a conversation</h2>
              <p className="text-muted-foreground">Choose one of your existing conversations to start chatting.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Dummy UserProfile data for current user avatar in chat
const sampleUserProfile = {
  name: 'Sarah Davis', // Example name
  profilePhotoUrl: 'https://picsum.photos/seed/currentUser/100/100',
};

