import z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Please enter a valid email address"),
  password: z
    .string("Please enter valid password")
    .min(1, "Please enter a valid password"),
});

export const registerSchema = z
  .object({
    name: z
      .string("Please enter valid name")
      .min(2, "Name must be at least 2 characters long"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string("Please enter valid password")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string("Please enter valid password")
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine(
    (v) => {
      return v.password === v.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const signupSchema = registerSchema;

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SignupInput = RegisterInput;
