import { deleteSessionForUser } from '@/server/auth/session';

export type UserId = number;

export type UserSession = {
  id: UserId;
};

export async function invalidateSessionsUseCase(user: UserSession) {
  await deleteSessionForUser(user.id);
}
