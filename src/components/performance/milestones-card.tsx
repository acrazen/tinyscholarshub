import type { Milestone } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Check, Minus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface MilestonesCardProps {
  milestones: Milestone[];
}

const categoryColors: Record<Milestone['category'], string> = {
  'Academic': 'bg-blue-100 text-blue-700 border-blue-300',
  'Social': 'bg-green-100 text-green-700 border-green-300',
  'Motor Skills': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'Creative': 'bg-purple-100 text-purple-700 border-purple-300',
};


export function MilestonesCard({ milestones }: MilestonesCardProps) {
  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Developmental Milestones
        </CardTitle>
        <CardDescription>Tracking progress in key areas.</CardDescription>
      </CardHeader>
      <CardContent>
        {milestones.length > 0 ? (
          <ScrollArea className="h-72">
            <ul className="space-y-3 pr-3">
              {milestones.map((milestone) => (
                <li key={milestone.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <div>
                    {milestone.achieved ? (
                      <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <Minus className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm">{milestone.title}</h4>
                       <Badge variant="outline" className={`text-xs ${categoryColors[milestone.category]}`}>{milestone.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{milestone.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {milestone.achieved ? 'Achieved on: ' : 'Target Date: '}
                      {format(new Date(milestone.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No milestones recorded yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
