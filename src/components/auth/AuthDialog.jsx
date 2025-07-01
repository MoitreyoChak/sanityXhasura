'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthDialog() {
  const [view, setView] = useState('signin'); // 'signin' or 'signup'

  // Reset to signin view when dialog is opened/closed
  const handleOpenChange = (open) => {
    if (!open) {
      setView('signin');
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        {view === 'signin' ? (
          <SignInForm onSwitch={setView} />
        ) : (
          <SignUpForm onSwitch={setView} />
        )}
      </DialogContent>
    </Dialog>
  );
}
