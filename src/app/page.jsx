import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Newspaper, Edit3, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PremiumSubscription from "@/components/PremiumSubscription";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Welcome to Content Hub
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover insightful articles, stories, and perspectives. Your central place for high-quality content, seamlessly delivered.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/blog">
                    Explore The Blog
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="digital content"
              width="600"
              height="400"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Content Hub?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide a seamless and powerful platform for content creation and consumption, powered by modern technology.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Latest Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Access a rich library of blog posts on various topics, always up-to-date with the latest trends and insights.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Live Previews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Editors can see their changes live on the site before publishing, ensuring content is perfect every time.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Powered by Sanity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Leveraging a powerful headless CMS for structured content and a seamless editing experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PremiumSubscription />
    </div>
  );
}
