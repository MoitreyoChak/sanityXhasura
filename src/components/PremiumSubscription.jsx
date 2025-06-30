'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function PremiumSubscription() {
  const { isPremium } = useAuth();

  if (isPremium) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Unlock Premium Access</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Supercharge your content experience. Get exclusive features, unlimited access, and priority support.
              </p>
            </div>
        </div>
        <div className="mx-auto max-w-2xl mt-12">
            <Card className="shadow-lg border-primary border-2">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-4xl font-headline">Premium Plan</CardTitle>
                    <CardDescription className="pt-2">For power users and content creators who want more.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <span className="text-5xl font-bold">$10</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 text-left text-md">
                        <li className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span>Unlimited access to all articles and resources</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span>Exclusive content, tutorials, and behind-the-scenes</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span>A completely ad-free reading experience</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span>Priority email support from our dedicated team</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full font-semibold text-lg">
                        Upgrade to Premium
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </section>
  );
}
