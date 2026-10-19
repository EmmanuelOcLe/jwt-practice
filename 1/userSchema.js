import * as z from 'zod'

export const User = z.object({
  username: z.string().min(1),
  password: z.coerce.string()
})
