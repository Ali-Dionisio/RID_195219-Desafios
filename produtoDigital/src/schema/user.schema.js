import { z } from "zod";

const userSchema = z.object({
    email: z.email("Invalid email"), 
    password: z.string().min(6, "Password must be at least 6 characteres long"),
})

const userIdSchema = z.object({
    userId: z.number().int().positive('User ID must be a  positive integer')
});

export { userSchema, userIdSchema };