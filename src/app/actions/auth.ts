"use server";

import { signupSchema } from "~/schemas";
import { db } from "~/server/db";
import { ZodError } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

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

    const hash = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hash,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((error) => error.message).join(" ");
    }
  }

  redirect("/signin");
}
