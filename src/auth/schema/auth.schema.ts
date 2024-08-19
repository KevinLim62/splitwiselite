import { z } from 'zod';

export const userSignInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export type UserSignInDto = z.infer<typeof userSignInSchema>;
