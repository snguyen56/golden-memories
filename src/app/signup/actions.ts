"use server";
import { auth } from "@/utils/auth";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
    });
  } catch (error: unknown) {
    const err = error as { message?: string; body?: { message?: string } };
    const errorMessage = err?.body?.message || err?.message || "Signup failed";
    throw new Error(errorMessage);
  }
};
