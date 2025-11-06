import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  clerkId: z.string(),
  password: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["admin", "staff"]).default("staff"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
