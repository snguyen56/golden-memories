"use server";
import { auth } from "@/utils/auth";

export const signUp = async (name: string, email: string, password: string) => {
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/",
    },
    asResponse: true,
  });
};
