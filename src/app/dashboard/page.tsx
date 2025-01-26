'use client';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/server/auth/actions/logout';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

export default function Dashboard() {
  const { execute, isPending } = useAction(logoutAction, {
    onSuccess() {
      toast.success('Logout successful!');
    },
  });

  function logout() {
    execute();
  }

  return (
    <div>
      <Button
        onClick={logout}
        disabled={isPending}
      >
        Logout
      </Button>
    </div>
  );
}
