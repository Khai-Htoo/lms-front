import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Please Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const activateSchema = z.object({
  code: z.string().min(4, "Code must be at least 4 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 6 characters"),
  email: z.string().email("Please Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 6 characters"),
  email: z.string().email("Please Enter valid email"),
});

export const chnangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const courseInfromationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  price: z.string().min(2, "Price must be at least 2 characters"),
  estimatedPrice: z.string(),
  tags: z.string().min(2, "Tags must be at least 2 characters"),
  level: z.string().min(2, "Level must be at least 2 characters"),
  demoUrl: z.string().min(2, "Demo Url must be at least 2 characters"),
});
