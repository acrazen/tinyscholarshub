import type { Guardian } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuardianContactCardProps {
  guardian: Guardian;
}

export function GuardianContactCard({ guardian }: GuardianContactCardProps) {
  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={guardian.profilePhotoUrl} alt={guardian.name} data-ai-hint="guardian portrait" />
          <AvatarFallback>{guardian.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{guardian.name}</CardTitle>
          <p className="text-sm text-muted-foreground flex items-center">
            <UserCheck className="h-4 w-4 mr-1.5" />
            {guardian.relation}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <a href={`tel:${guardian.phoneNumber}`} className="flex items-center text-sm text-primary hover:underline">
          <Phone className="h-4 w-4 mr-2" />
          {guardian.phoneNumber}
        </a>
        <a href={`mailto:${guardian.email}`} className="flex items-center text-sm text-primary hover:underline">
          <Mail className="h-4 w-4 mr-2" />
          {guardian.email}
        </a>
        <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
                <Phone className="mr-2 h-4 w-4"/> Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
                <Mail className="mr-2 h-4 w-4"/> Email
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
