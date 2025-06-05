"use server";
import { auth } from "@/utils/auth";
import { APIError } from "better-auth/api";

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
  } catch (error) {
    if (error instanceof APIError) {
      throw new Error(error.message);
    }
  }
};
