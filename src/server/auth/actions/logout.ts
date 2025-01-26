'use server'

import { authenticatedAction } from '@/lib/safe-action';
import { invalidateSessionsUseCase } from '@/server/auth/use-cases/session';
import { redirect } from 'next/navigation';

export const logoutAction = authenticatedAction
  .action(async ({ ctx: { user } }) => {
    await invalidateSessionsUseCase(user);
    redirect('/');
  });