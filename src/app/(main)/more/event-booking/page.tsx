// src/app/(main)/more/event-booking/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { CalendarPlus, MapPin, Info, CheckCircle, XCircle, CalendarClock, Ticket, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSchoolEvents } from '@/lib/services/eventService'; // Use service
import type { SchoolEvent } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function EventBookingPage() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await getSchoolEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast({
          title: "Error",
          description: "Could not load school events.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, [toast]);

  const handleBookingToggle = (eventId: string) => {
    // In a real app, this would call a service to update booking status
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, isBooked: !event.isBooked } : event
      )
    );
    const event = events.find(e => e.id === eventId);
    if (event) {
        toast({
            title: event.isBooked ? "Booking Cancelled" : "Event Booked!",
            description: `You have ${event.isBooked ? "cancelled your booking for" : "successfully booked"} ${event.title}. (Simulation)`,
        });
    }
  };

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');
  const cancelledEvents = events.filter(event => event.status === 'cancelled');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <CalendarPlus className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Event Booking</h1>
        <p className="text-muted-foreground max-w-md">
          Discover and book school events, parent-teacher meetings, and workshops.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onBookToggle={handleBookingToggle} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No upcoming events scheduled at the moment.</p>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} onBookToggle={handleBookingToggle} isPastOrCancelled={true} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No past events to show.</p>
          )}
        </TabsContent>
        <TabsContent value="cancelled">
          {cancelledEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cancelledEvents.map((event) => (
                <EventCard key={event.id} event={event} onBookToggle={handleBookingToggle} isPastOrCancelled={true} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No cancelled events.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EventCardProps {
  event: SchoolEvent;
  onBookToggle: (eventId: string) => void;
  isPastOrCancelled?: boolean;
}

function EventCard({ event, onBookToggle, isPastOrCancelled = false }: EventCardProps) {
  return (
    <Card className="shadow-lg rounded-xl flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          {event.status === 'upcoming' && event.isBooked && <Badge variant="secondary" className="bg-green-100 text-green-700">Booked</Badge>}
          {event.status === 'past' && <Badge variant="outline">Past</Badge>}
          {event.status === 'cancelled' && <Badge variant="destructive">Cancelled</Badge>}
        </div>
        <CardDescription className="flex items-center text-sm pt-1">
          <CalendarClock className="h-4 w-4 mr-2 text-primary" />
          {format(new Date(event.date), 'PPP')} {event.time && `at ${event.time}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-start text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-start text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
          <span>{event.description}</span>
        </div>
      </CardContent>
      {event.status === 'upcoming' && !isPastOrCancelled && (
        <CardFooter>
          <Button
            className="w-full"
            variant={event.isBooked ? 'outline' : 'default'}
            onClick={() => onBookToggle(event.id)}
          >
            {event.isBooked ? (
              <>
                <XCircle className="mr-2 h-4 w-4" /> Cancel Booking
              </>
            ) : (
              <>
                <Ticket className="mr-2 h-4 w-4" /> Book Now
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
