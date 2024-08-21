import { users } from '@/schema/users'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import db from './db'
import { eq } from 'drizzle-orm'

export const insertUserSchema = createInsertSchema(users, {
  password: z
    .string()
    .min(5)
    .regex(/^[a-zA-Z0-9]+$/)
    .max(32),
  email: z.string().email(),
})

export type User = z.infer<typeof insertUserSchema>

const getUsers = async () =>
  await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)

const createUser = async (newUser: User) => {
  'id' in newUser && delete newUser.id

  return await db.insert(users).values(newUser).returning({
    id: users.id,
    name: users.name,
    email: users.email,
  })
}

const getUserByEmail = async (email: string) =>
  await db.select().from(users).where(eq(users.email, email))

export default {
  getUsers,
  createUser,
  getUserByEmail
} as const
