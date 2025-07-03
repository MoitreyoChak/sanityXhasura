'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function UpgradeDialog({ open, onOpenChange, onConfirm, loading }) {
  const { toast } = useToast();

  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) {
      toast({
        title: "Upgrade Successful!",
        description: "You are now a premium member.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Upgrade Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Premium Subscription</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to upgrade to the Premium Plan for $10/month. This action will charge your default payment method.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? "Upgrading..." : "Confirm & Pay"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
