"use server";

import { signupSchema } from "~/schemas";
import { db } from "~/server/db";
import { ZodError } from "zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "~/server/auth";

// import bcrypt from "bcryptjs";

export async function signout() {
  await signOut();
}

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid username or password.";
        default:
          return "Something went wrong";
      }
    }

    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { email, password } = await signupSchema.parseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return "User already exists.";
    }

    // const hash = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((error) => error.message).join(" ");
    }
  }

  redirect("/signin");
}
