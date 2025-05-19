
// src/app/(main)/more/awards/page.tsx
import { Award as AwardIcon, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

interface Award {
  id: string;
  title: string;
  awardingBody: string;
  year: string;
  description: string;
  icon?: JSX.Element; // Using JSX.Element for direct icon components
  imageUrl?: string;
  dataAiHint?: string;
}

const sampleAwardsData: Award[] = [
  {
    id: 'award1',
    title: 'Best Early Learning Center 2023',
    awardingBody: 'National Education Excellence',
    year: '2023',
    description: 'Recognized for innovative teaching methodologies and nurturing environment.',
    icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    dataAiHint: "award trophy",
  },
  {
    id: 'award2',
    title: 'Child Safety Excellence Award',
    awardingBody: 'SafeKids Foundation',
    year: '2022',
    description: 'Awarded for maintaining the highest standards of child safety and security.',
    imageUrl: 'https://placehold.co/80x80.png',
    dataAiHint: "safety shield",

  },
  {
    id: 'award3',
    title: 'Green School Initiative Award',
    awardingBody: 'Environmental Education Board',
    year: '2023',
    description: 'For outstanding efforts in promoting environmental awareness and sustainability.',
    icon: <Star className="h-8 w-8 text-green-500 fill-green-500" />,
    dataAiHint: "green award",
  },
  {
    id: 'award4',
    title: 'Community Engagement Award',
    awardingBody: 'Local Community Council',
    year: '2021',
    description: 'Acknowledged for fostering strong relationships with local families and community members.',
    imageUrl: 'https://placehold.co/80x80.png',
    dataAiHint: "community hands",
  },
];

export default function AwardsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <AwardIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Our Awards & Recognitions</h1>
        <p className="text-muted-foreground max-w-lg">
          We are proud of our achievements and the recognition we've received for our commitment to excellence in early childhood education.
        </p>
      </div>

      {sampleAwardsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleAwardsData.map((award) => (
            <Card key={award.id} className="shadow-lg rounded-xl flex flex-col">
              <CardHeader className="flex flex-row items-start space-x-4 p-5 bg-muted/20">
                {award.icon ? (
                  <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0">
                    {award.icon}
                  </div>
                ) : award.imageUrl ? (
                  <div className="p-1 bg-background rounded-lg shadow-sm flex-shrink-0">
                    <Image 
                        src={award.imageUrl} 
                        alt={`${award.title} icon`} 
                        width={60} 
                        height={60} 
                        className="rounded-md object-contain"
                        data-ai-hint={award.dataAiHint || "award image"}
                    />
                  </div>
                ) : <div className="p-3 bg-background rounded-lg shadow-sm flex-shrink-0"><AwardIcon className="h-8 w-8 text-muted-foreground" /></div> }
                <div className="flex-grow">
                  <CardTitle className="text-xl">{award.title}</CardTitle>
                  <CardDescription className="text-sm">
                    Awarded by: {award.awardingBody} - {award.year}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <AwardIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">No awards to display</h3>
          <p className="mt-1 text-sm text-muted-foreground">We're always striving for excellence!</p>
        </div>
      )}
    </div>
  );
}
