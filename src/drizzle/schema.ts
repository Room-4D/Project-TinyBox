import { pgTable, serial, text, integer, timestamp, boolean, pgEnum, index } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

export const accountTypeEnum = pgEnum('type', ['email', 'google', 'github']);

export const users = pgTable('tb_user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  accountType: accountTypeEnum('accountType').notNull(),
  githubId: text('githubId').unique(),
  googleId: text('googleId').unique(),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  password: text('password').notNull(),
  salt: text('salt'),
});

export const sessions = pgTable('tb_session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
