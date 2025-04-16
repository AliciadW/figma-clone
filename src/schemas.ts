import { string, object } from "zod";

export const signupSchema = object({
  email: string({ required_error: "Email is required." }).email(
    "Invalid email.",
  ),
  password: string({ required_error: "Password is required." })
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password cannot be longer than 32 characters long."),
});

export const signInSchema = object({
  email: string({ required_error: "Email is required." }).email(
    "Invalid email",
  ),
  password: string({ required_error: "Password is required." }),
});
