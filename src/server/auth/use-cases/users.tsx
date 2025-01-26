import { createUser, getUserByEmail, verifyPassword } from '@/server/auth/users';

export async function registerUserUseCase(email: string, password: string, name: string) {
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new Error('User already exists!');
  }

  const user = await createUser(email, password, name);

  return user
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new Error('User not found!');
  }

  const isPasswordCorrect = await verifyPassword(email, password)

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password!');
  }

  return user
}