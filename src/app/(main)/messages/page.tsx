
// src/app/(main)/messages/page.tsx
"use client";

import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Keep for search
import { Textarea } from '@/components/ui/textarea'; // For message input
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Paperclip, Search, User, ArrowLeft, Loader2, MoreVertical, CheckCircle } from 'lucide-react';
import type { Conversation, ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { sampleConversations, sampleMessages, sampleUserProfile, studentsData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useChatSettings } from '@/context/chat-settings-context';

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const router = useRouter();
  const { readReceipts, notificationSound, enterToSend, mediaAutoDownload } = useChatSettings();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !selectedConversationId && !isMobile && sampleConversations.length > 0) {
      // Auto-select first conversation on desktop if none selected
      // setSelectedConversationId(sampleConversations[0].id); 
    }
  }, [isClient, selectedConversationId, isMobile]);

  useEffect(() => {
    if (selectedConversationId) {
      setMessages(sampleMessages[selectedConversationId] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    if (isClient) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isClient]);

  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversationId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulate updating sample data (in a real app, this would be an API call)
    if (sampleMessages[selectedConversationId]) {
      sampleMessages[selectedConversationId].push(newMsg);
    } else {
      sampleMessages[selectedConversationId] = [newMsg];
    }
    const convoIndex = sampleConversations.findIndex(c => c.id === selectedConversationId);
    if (convoIndex !== -1) {
      sampleConversations[convoIndex].lastMessage = newMessage;
      sampleConversations[convoIndex].lastMessageTimestamp = new Date().toISOString();
    }

    setNewMessage('');

    // Simulate receiving a reply for notification/read receipt demo
    setTimeout(() => {
        if (selectedConversationId) { // Check if still in a convo
            const replyMsg: ChatMessage = {
                id: `reply-${Date.now()}`,
                sender: 'other',
                text: "Got it! Thanks for your message.",
                timestamp: new Date().toISOString(),
                avatarUrl: sampleConversations.find(c => c.id === selectedConversationId)?.avatarUrl
            };
            setMessages(prev => [...prev, replyMsg]);
            if (sampleMessages[selectedConversationId]) {
                sampleMessages[selectedConversationId].push(replyMsg);
            }
            
            if (notificationSound) {
                console.log("SIMULATED: Notification sound would play for new message from other.");
            }
            if (mediaAutoDownload !== 'never') {
                console.log(`SIMULATED: Media (if any) in reply would be handled based on auto-download: ${mediaAutoDownload}`);
            }
        }
    }, 2000);
  };
  
  const handleTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (enterToSend && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sortedConversations = isClient ? [...sampleConversations].sort((a, b) =>
    new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
  ) : [];

  const filteredConversations = sortedConversations.filter(convo =>
    convo.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = sampleConversations.find(c => c.id === selectedConversationId);

  const handleChatWithTeacher = () => {
    if (!isClient) return;
    const firstStudent = studentsData[0];
    if (!firstStudent) {
      toast({ title: "No Student Data", description: "Cannot determine class teacher.", variant: "destructive" });
      return;
    }
    let teacherConversationNamePart = "";
    if (firstStudent.className === "Butterflies") teacherConversationNamePart = "Ms. Emily (Butterflies)";
    else if (firstStudent.className === "Caterpillars") teacherConversationNamePart = "Mr. John (Caterpillars)";

    if (!teacherConversationNamePart) {
      toast({ title: "Teacher Not Identified", description: `Could not identify teacher for class: ${firstStudent.className}.`, variant: "destructive" });
      return;
    }
    const teacherConvo = sampleConversations.find(c => c.participantName.includes(teacherConversationNamePart));
    if (teacherConvo) {
      setSelectedConversationId(teacherConvo.id);
    } else {
      toast({ title: "Teacher Chat Not Found", description: `Could not find chat with ${teacherConversationNamePart}.`, variant: "destructive" });
    }
  };

  const navigateToChatSettings = () => {
    router.push('/messages/settings');
  };

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 5rem)' }}>
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 5rem)' }}>
      <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
        <h1 className="text-2xl font-bold flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> Messages</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleChatWithTeacher}>
              Chat with Class Teacher
            </DropdownMenuItem>
            <DropdownMenuItem onClick={navigateToChatSettings}>
              Chat Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className={cn(
          "w-full md:w-[320px] lg:w-[360px] border-r border-border flex flex-col bg-card",
          selectedConversationId && isMobile && "hidden",
          !selectedConversationId && isMobile && "flex",
          !isMobile && "md:flex"
        )}>
          <div className="p-3 border-b border-border hidden md:flex items-center justify-between">
            <h1 className="text-xl font-semibold flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary" /> Chats</h1>
            <Button variant="ghost" size="icon" onClick={handleChatWithTeacher} title="Chat with Class Teacher">
              <User className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-background text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredConversations.length > 0 ? filteredConversations.map(convo => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={cn(
                  "flex items-center w-full p-3 hover:bg-muted/50 transition-colors text-left space-x-3",
                  selectedConversationId === convo.id && "bg-muted"
                )}
              >
                <Avatar className="h-11 w-11">
                  <AvatarImage src={convo.avatarUrl} alt={convo.participantName} data-ai-hint="person avatar" />
                  <AvatarFallback>{convo.participantName.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className={cn("flex-1 overflow-hidden min-w-0 w-0")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm truncate">{convo.participantName}</h3>
                    {isClient && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(convo.lastMessageTimestamp), 'p')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unreadCount && convo.unreadCount > 0 && (
                  <div className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center self-center">
                    {convo.unreadCount}
                  </div>
                )}
              </button>
            )) : (
              <p className="p-4 text-sm text-muted-foreground text-center">No conversations found.</p>
            )}
          </ScrollArea>
        </aside>

        <main className={cn(
          "flex-1 flex flex-col bg-background",
          !selectedConversationId && isMobile && "hidden",
          !selectedConversationId && !isMobile && "flex items-center justify-center" // Center placeholder when no chat selected on desktop
        )}>
          {selectedConversation ? (
            <>
              <header className="p-3 border-b border-border bg-card flex items-center space-x-3 shadow-sm">
                <Button variant="ghost" size="icon" className="md:hidden mr-1" onClick={() => setSelectedConversationId(null)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.participantName} data-ai-hint="person chat avatar" />
                  <AvatarFallback>{selectedConversation.participantName.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-base">{selectedConversation.participantName}</h2>
                  <p className="text-xs text-muted-foreground">{selectedConversation.participantRole || 'Online'}</p>
                </div>
              </header>
              <ScrollArea className="flex-1 p-4">
                {messages.map(msg => (
                  <div key={msg.id} className={cn(
                    "flex items-end space-x-2 max-w-[80%] sm:max-w-[70%] mb-3",
                    msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
                  )}>
                    {msg.sender === 'other' && (
                      <Avatar className="h-8 w-8 self-start flex-shrink-0">
                        <AvatarImage src={msg.avatarUrl} data-ai-hint="chat participant avatar" />
                        <AvatarFallback>{selectedConversation.participantName.substring(0, 1).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn(
                      "p-3 rounded-xl shadow-sm break-words",
                      msg.sender === 'user' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border border-border"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      {isClient && (
                        <div className={cn("text-xs mt-1.5 flex items-center", msg.sender === 'user' ? 'text-primary-foreground/80 justify-end' : 'text-muted-foreground justify-start')}>
                          <span>{format(new Date(msg.timestamp), 'p')}</span>
                          {msg.sender === 'other' && readReceipts && (
                            <CheckCircle className="h-3 w-3 ml-1 text-blue-500" title="Simulated Read Receipt" />
                          )}
                           {msg.sender === 'user' && ( // Simulate "Sent" or "Delivered" for user's own messages
                            <CheckCircle className="h-3 w-3 ml-1 text-primary-foreground/70" title="Sent" />
                          )}
                        </div>
                      )}
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8 self-start flex-shrink-0">
                        <AvatarImage src={sampleUserProfile.profilePhotoUrl} data-ai-hint="my avatar" />
                        <AvatarFallback>{sampleUserProfile.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card flex items-center space-x-3">
                <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleTextAreaKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-background focus-visible:ring-1 focus-visible:ring-primary text-sm min-h-[40px] max-h-[120px] resize-none"
                  autoComplete="off"
                  rows={1}
                />
                <Button type="submit" size="icon" disabled={newMessage.trim() === ''} className="w-10 h-10">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <MessageSquare className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground">Select a conversation</h2>
              <p className="text-sm text-muted-foreground">Choose one of your existing conversations or start a new one.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
