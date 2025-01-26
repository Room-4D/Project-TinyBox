'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { RegisterSchema } from '@/schemas';
import { registerUserUseCase } from '@/server/auth/use-cases/users';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const registerAction = unauthenticatedAction
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const user = await registerUserUseCase(email, password, name);
    await setSession(user.id);
    return redirect('/dashboard');
  });
