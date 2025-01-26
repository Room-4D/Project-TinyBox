import db from '@/drizzle';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { hashPassword } from './utils';

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function createUser(email: string, password: string, name: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);

  const [user] = await db
    .insert(users)
    .values({
      email,
      password: hash,
      salt,
      accountType: 'email',
      name,
    })
    .returning();

    return user
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new Error('User not found!');
  }

  const salt = user.salt
  const savedPassword = user.password

  if (!salt || !savedPassword) {
    return false
  }

  const hash = await hashPassword(plainTextPassword, salt)
  return user.password === hash
}
