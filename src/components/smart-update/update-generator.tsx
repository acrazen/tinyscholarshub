"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAIUpdateOptions } from '@/actions/smart-update-actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Copy, Check } from 'lucide-react';

const formSchema = z.object({
  activityDescription: z.string().min(10, "Please describe the activity in at least 10 characters.").max(500, "Description is too long."),
});

type FormData = z.infer<typeof formSchema>;

export function UpdateGenerator() {
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedOptions([]);
    try {
      const result = await getAIUpdateOptions({ activityDescription: data.activityDescription });
      if (result.success) {
        setGeneratedOptions(result.data || []);
        if ((result.data || []).length === 0) {
            toast({ title: "No options generated", description: "The AI couldn't generate options for this input. Try rephrasing.", variant: "default" });
        }
      } else {
        toast({ title: "Error", description: result.error || "Failed to generate updates.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      toast({ title: "Copied!", description: "Update option copied to clipboard." });
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      toast({ title: "Copy Failed", description: "Could not copy text.", variant: "destructive" });
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Smart Update Generator</CardTitle>
        </div>
        <CardDescription>Describe the day's activities, and we'll help you craft engaging updates for parents!</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="activityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="activityDescription" className="text-base">Activity Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="activityDescription"
                      placeholder="e.g., Today we learned about farm animals and painted our favorite ones!"
                      rows={5}
                      className="resize-none focus:ring-primary focus:border-primary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Options
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {generatedOptions.length > 0 && (
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Suggested Updates:</h3>
          <ul className="space-y-4">
            {generatedOptions.map((option, index) => (
              <li key={index} className="p-4 border rounded-lg bg-muted/50 relative group">
                <p className="text-sm text-foreground pr-10">{option}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopyToClipboard(option, index)}
                  aria-label="Copy update option"
                >
                  {copiedIndex === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
