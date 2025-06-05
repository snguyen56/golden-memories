"use server";
import { auth } from "@/utils/auth";

export const signin = async (
  email: string,
  password: string,
  rememberMe: boolean = false,
) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
    });
  } catch (error: unknown) {
    const err = error as { message?: string; body?: { message?: string } };
    const errorMessage = err?.body?.message || err?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
