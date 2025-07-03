'use client';

import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import ReferralCodeDisplay from '@/components/ReferralCodeDisplay';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
        <div className="container flex items-center justify-center py-20">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>You must be logged in to view this page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/')}>Go to Homepage</Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container py-12 md:py-20">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person portrait" />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription className="text-lg">{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Welcome to your profile page. Here you can manage your account settings and preferences.</p>
          <Button variant="destructive" onClick={handleLogout}>
            Log Out
          </Button>
        </CardContent>
      </Card>
      
      {user.isPremium && <ReferralCodeDisplay userId={user.id} />}
    </div>
  );
}
