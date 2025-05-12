// src/app/(main)/more/resources/page.tsx
import { LibraryBig, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sampleResources } from '@/lib/data';
import type { ResourceItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ResourcesPage() {
  const resources = sampleResources;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
         <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <LibraryBig className="h-8 w-8 text-primary" />
          </div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground max-w-md">
          Find helpful articles, documents, videos, and links shared by the school.
        </p>
      </div>

      {resources.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource: ResourceItem) => (
            <Card key={resource.id} className="shadow-lg rounded-xl flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <resource.icon className="h-8 w-8 text-primary mb-2" />
                    <Badge variant="outline">{resource.category}</Badge>
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                {resource.type === 'pdf' ? (
                  <Button asChild className="w-full">
                    <a href={resource.url} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </a>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> 
                      {resource.type === 'video' ? 'Watch Video' : 'View Resource'}
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <LibraryBig className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-foreground">No resources available</h3>
          <p className="mt-1 text-sm text-muted-foreground">Check back later for helpful materials.</p>
        </div>
      )}
    </div>
  );
}
