'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { LoginSchema } from '@/schemas';
import { signInUseCase } from '@/server/auth/use-cases/users';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const loginAction = unauthenticatedAction
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await signInUseCase(email, password);
    await setSession(user.id);
    redirect('/dashboard');
  });
