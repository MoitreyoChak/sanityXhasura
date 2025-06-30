
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Users, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                The Story Behind Content Hub
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Content Hub was born from a simple idea: to create a centralized, beautiful, and efficient platform for sharing knowledge and stories. We believe in the power of content to inspire, educate, and connect people.
              </p>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="team collaboration"
              width="600"
              height="400"
              alt="About Us"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower creators and businesses by providing a seamless and powerful platform for content creation, management, and distribution. We aim to foster a community of passionate storytellers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading content hub that bridges the gap between content creators and their audience, making high-quality information accessible to everyone, everywhere.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                We value integrity, innovation, and collaboration. We are committed to excellence and are passionate about helping our users succeed in their content journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Meet Our Team</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate individuals driving Content Hub forward.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <Card className="text-center">
              <CardHeader>
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">Jane Doe</CardTitle>
                <p className="text-primary">CEO & Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">The visionary behind Content Hub, leading the team with passion and innovation.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">John Smith</CardTitle>
                <p className="text-primary">Lead Developer</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">The architect of our platform, ensuring a robust and scalable infrastructure.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">Emily Myers</CardTitle>
                <p className="text-primary">Head of Content</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Curating and managing all the amazing content you find on our hub.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
