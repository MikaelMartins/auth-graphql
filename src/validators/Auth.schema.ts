import { z } from "zod"

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

export type loginSchema = z.infer<typeof registerSchema>