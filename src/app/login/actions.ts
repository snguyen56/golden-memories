"use server";
import { auth } from "@/utils/auth";
import { APIError } from "better-auth/api";

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
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error(error.message);
    }
  }
};
