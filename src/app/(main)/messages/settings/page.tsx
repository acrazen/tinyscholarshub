
// src/app/(main)/messages/settings/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SlidersHorizontal, DownloadCloud, ShieldCheck } from 'lucide-react'; // Replaced MessageCircleSettings with SlidersHorizontal
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function ChatSettingsPage() {
  const [readReceipts, setReadReceipts] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [enterToSend, setEnterToSend] = useState(false);
  const [mediaAutoDownload, setMediaAutoDownload] = useState('wifi'); // 'wifi', 'cellular', 'never'

  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, you would save these settings to a backend or localStorage
    console.log({
      readReceipts,
      notificationSound,
      enterToSend,
      mediaAutoDownload,
    });
    toast({
      title: "Chat Settings Saved",
      description: "Your chat preferences have been updated (simulation).",
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <SlidersHorizontal className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Chat Settings</h1>
        <p className="text-muted-foreground">
          Customize your messaging experience.
        </p>
      </div>

      <Card className="shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle>General Chat Preferences</CardTitle>
          <CardDescription>Manage how your chat functions and appears.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="readReceipts" className="text-base font-medium">
                Read Receipts
              </Label>
              <p className="text-xs text-muted-foreground">Allow others to see when you've read their messages.</p>
            </div>
            <Switch
              id="readReceipts"
              checked={readReceipts}
              onCheckedChange={setReadReceipts}
              aria-label="Toggle read receipts"
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="notificationSound" className="text-base font-medium">
                Notification Sound
              </Label>
              <p className="text-xs text-muted-foreground">Play a sound for new message notifications.</p>
            </div>
            <Switch
              id="notificationSound"
              checked={notificationSound}
              onCheckedChange={setNotificationSound}
              aria-label="Toggle notification sound"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
            <div>
              <Label htmlFor="enterToSend" className="text-base font-medium">
                Enter Key to Send
              </Label>
              <p className="text-xs text-muted-foreground">Use the Enter key to send messages instead of adding a new line.</p>
            </div>
            <Switch
              id="enterToSend"
              checked={enterToSend}
              onCheckedChange={setEnterToSend}
              aria-label="Toggle Enter key to send"
            />
          </div>

          <Separator />

          <div className="space-y-2">
             <Label className="text-base font-medium flex items-center">
                <DownloadCloud className="mr-2 h-5 w-5 text-primary" />
                Media Auto-Download
            </Label>
            <p className="text-xs text-muted-foreground pb-2">Choose when to automatically download photos and videos.</p>
            <RadioGroup defaultValue={mediaAutoDownload} onValueChange={setMediaAutoDownload} className="space-y-2">
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="wifi" id="wifi" />
                <Label htmlFor="wifi" className="font-normal flex-grow cursor-pointer">Wi-Fi Only</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="cellular" id="cellular" />
                <Label htmlFor="cellular" className="font-normal flex-grow cursor-pointer">Wi-Fi & Cellular</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="never" id="never" />
                <Label htmlFor="never" className="font-normal flex-grow cursor-pointer">Never</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

           <div className="space-y-2">
             <Label className="text-base font-medium flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                Privacy & Security
            </Label>
             <Button variant="outline" size="sm">Blocked Contacts</Button>
             <p className="text-xs text-muted-foreground pt-1">Manage users you've blocked from messaging you.</p>
          </div>


          <div className="pt-4 text-right">
            <Button onClick={handleSaveChanges}>Save Chat Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
