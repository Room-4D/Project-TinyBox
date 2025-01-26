import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
import { z } from 'zod';

import { getCurrentSession } from '@/server/auth/session';
import { getCurrentUser } from './session';

class ActionError extends Error {}

// Base client.
export const unauthenticatedAction = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  // Define logging middleware.
}).use(async ({ next, clientInput, metadata }) => {
  console.log('LOGGING MIDDLEWARE');

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log('Result ->', result);
  console.log('Client input ->', clientInput);
  console.log('Metadata ->', metadata);
  console.log('Action execution took', endTime - startTime, 'ms');

  // And then return the result of the awaited action.
  return result;
});

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authenticatedAction = unauthenticatedAction
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = getCurrentSession();

    if (!session) {
      throw new Error('Session not found!');
    }

    const user = await getCurrentUser();

    if (!user) {
      throw new Error('Session is not valid!');
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { user } });
  });
