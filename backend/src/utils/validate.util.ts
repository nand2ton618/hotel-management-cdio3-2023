import { z } from 'zod'

const signUpSchema = z.object({
  username: z.string().nonempty('Username is required'),
  email: z.string().nonempty('Email is required').email('Not a valid email'),
  password: z.string().nonempty('Password is required').min(6, 'Password is too short'),
})

const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email('Not a valid email'),
  password: z.string().nonempty('Password is required').min(6, 'Password is too short'),
})

const refreshSchema = z.object({
  refreshToken: z.string().nonempty(),
})

export { signInSchema, signUpSchema, refreshSchema }
