'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthDialog({ children }) {
  const [view, setView] = useState('signin'); // 'signin' or 'signup'
  const [open, setOpen] = useState(false);

  // Reset to signin view when dialog is closed
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setView('signin');
      }, 300); // delay to allow for closing animation
    }
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || <Button>Login</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        {view === 'signin' ? (
          <SignInForm onSwitch={setView} onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onSwitch={setView} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
