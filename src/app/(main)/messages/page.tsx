
// src/app/(main)/messages/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Paperclip, Search, Settings2, ArrowLeft, User as ContactIcon } from 'lucide-react';
import type { Conversation, ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { sampleConversations, sampleMessages, sampleUserProfile, studentsData } from '@/lib/data'; // Import sample data
import { useToast } from '@/hooks/use-toast';

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs only on the client, after initial hydration
    // Determine the initial selected conversation ID here
    const sortedConversationsList = [...sampleConversations].sort(
      (a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
    );
    const initialId = sortedConversationsList[0]?.id || null;
    setSelectedConversationId(initialId);
  }, []); // Empty dependency array ensures this runs once on mount

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

    // Simulate updating the sample data (in a real app, this would be an API call)
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
  };

  const sortedConversations = useMemo(() => {
    return [...sampleConversations].sort(
      (a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
    );
  }, [sampleConversations]); // Re-sort if sampleConversations itself changes reference, though direct mutation won't trigger this useMemo as effectively

  const filteredConversations = sortedConversations.filter(convo =>
    convo.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = sampleConversations.find(c => c.id === selectedConversationId);

  const handleChatWithTeacher = () => {
    if (studentsData.length === 0) {
      toast({ title: "No Student Data", description: "Cannot determine class teacher."});
      return;
    }
    const currentStudent = studentsData[0];
    const studentClassName = currentStudent.className;

    const teacherConvo = sampleConversations.find(convo =>
      convo.participantRole === 'Teacher' && convo.participantName.includes(studentClassName)
    );

    if (teacherConvo) {
      setSelectedConversationId(teacherConvo.id);
    } else {
      const defaultTeacherConvo = sampleConversations.find(convo => convo.participantName.includes("Ms. Emily"));
      if (defaultTeacherConvo){
        setSelectedConversationId(defaultTeacherConvo.id);
         toast({ title: "Teacher Found", description: `Opening chat with ${defaultTeacherConvo.participantName}. (Class-specific match not found)`});
      } else {
        toast({ title: "Teacher Not Found", description: `Could not find a conversation for ${studentClassName} class teacher.`});
      }
    }
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 5rem)' }}> {/* Adjusted height */}
      <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
        <h1 className="text-2xl font-bold flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> Messages</h1>
        <Button variant="ghost" size="icon"><Settings2 className="h-5 w-5" /></Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className={cn(
          "w-full md:w-[320px] lg:w-[360px] border-r border-border flex flex-col bg-card",
          selectedConversationId && "hidden md:flex"
        )}>
          <div className="p-4 border-b border-border hidden md:block">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary" /> Chats</h1>
              <Button variant="outline" size="sm" onClick={handleChatWithTeacher} className="whitespace-nowrap">
                <ContactIcon className="mr-1.5 h-4 w-4" /> Chat with Teacher
              </Button>
            </div>
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
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm truncate">{convo.participantName}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(convo.lastMessageTimestamp), 'p')}
                    </span>
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
          !selectedConversationId && "hidden md:flex" // Initially hide on mobile if no convo selected
        )}>
          {selectedConversation ? (
            <>
              <header className="p-3 border-b border-border bg-card flex items-center space-x-3 shadow-sm">
                 <Button variant="ghost" size="icon" className="md:hidden mr-1" onClick={() => setSelectedConversationId(null)}>
                    <ArrowLeft className="h-5 w-5"/>
                 </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.participantName} data-ai-hint="person chat avatar" />
                  <AvatarFallback>{selectedConversation.participantName.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-base">{selectedConversation.participantName}</h2>
                  <p className="text-xs text-muted-foreground">{selectedConversation.participantRole || 'Online'}</p>
                </div>
              </header>
              <ScrollArea className="flex-1 p-4 space-y-2"> {/* Reduced space-y-4 to space-y-2 */}
                {messages.map(msg => (
                  <div key={msg.id} className={cn(
                    "flex items-end space-x-2 max-w-[80%] sm:max-w-[70%]",
                    msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
                  )}>
                    {msg.sender === 'other' && (
                      <Avatar className="h-8 w-8 self-start flex-shrink-0">
                        <AvatarImage src={msg.avatarUrl} data-ai-hint="chat participant avatar"/>
                        <AvatarFallback>{selectedConversation.participantName.substring(0,1).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn(
                      "p-3 rounded-xl shadow-sm break-words", // Ensure this is text-sm
                      msg.sender === 'user' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border border-border"
                    )}>
                      <p className="text-sm">{msg.text}</p> {/* Ensure text is sm */}
                       <p className={cn("text-xs mt-1.5", msg.sender === 'user' ? 'text-primary-foreground/80 text-right' : 'text-muted-foreground text-left')}>
                        {format(new Date(msg.timestamp), 'p')}
                      </p>
                    </div>
                     {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8 self-start flex-shrink-0">
                        <AvatarImage src={sampleUserProfile.profilePhotoUrl} data-ai-hint="my avatar"/>
                        <AvatarFallback>{sampleUserProfile.name.substring(0,1).toUpperCase()}</AvatarFallback>
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
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-background focus-visible:ring-1 focus-visible:ring-primary text-sm h-10"
                  autoComplete="off"
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

