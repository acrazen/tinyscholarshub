
"use client";

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button'; // Ensure Button is imported for the toast action

export function PWALoader() {
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

          // Handle updates: if a new SW is waiting, prompt the user to refresh.
          if (registration.waiting) {
            toast({
              title: 'Update Available',
              description: 'A new version of the app is available.',
              action: (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => registration.waiting?.postMessage({ type: 'SKIP_WAITING' })}
                >
                  Refresh Now
                </Button>
              ),
              duration: Infinity, // Keep toast visible until user acts or it's programmatically dismissed
            });
          }
          
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                     toast({
                        title: 'Update Ready',
                        description: 'A new version has been installed. Please refresh to apply.',
                         action: (
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.reload()}
                            >
                            Refresh
                            </Button>
                        ),
                        duration: Infinity,
                    });
                  } else {
                    // Content is cached for the first time (offline use)
                    toast({
                      title: 'App Ready Offline',
                      description: 'This app can now be used offline.',
                      duration: 5000, // Show for 5 seconds
                    });
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
           toast({
            variant: "destructive",
            title: 'PWA Error',
            description: 'Could not initialize offline features.',
            duration: 5000,
          });
        });

      // Listen for controller change - happens when new SW takes over.
      let refreshing: boolean;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
      });

    }
  }, [toast]);

  return null; // This component does not render anything visible
}
