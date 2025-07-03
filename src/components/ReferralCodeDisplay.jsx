'use client';

import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import client from "@/lib/apolloClient";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const GET_USER_REFERRAL_CODE = gql`
  query GetUserReferralCode($userId: String!) {
    referralCodes(where: {user_id: {_eq: $userId}}, limit: 1) {
      code
      is_used
    }
  }
`;

export default function ReferralCodeDisplay({ userId }) {
  const { toast } = useToast();
  const { data, loading, error } = useQuery(GET_USER_REFERRAL_CODE, {
    variables: { userId },
    client: client,
  });

  if (loading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Could not load your referral information.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const referralCodeData = data?.referralCodes?.[0];

  if (!referralCodeData) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Referral Code</CardTitle>
          <CardDescription>No referral code found for your account.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCodeData.code);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard.",
    });
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Your Premium Referral Code</CardTitle>
        <CardDescription>Share this code with a friend! They get a discount, and you get a bonus when they sign up.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono tracking-widest">{referralCodeData.code}</span>
            <Badge variant={referralCodeData.is_used ? "destructive" : "secondary"} className="mt-2 w-fit">
              {referralCodeData.is_used ? "Already Used" : "Not Used"}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
