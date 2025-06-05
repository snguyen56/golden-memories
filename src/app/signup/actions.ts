"use server";
import { auth } from "@/utils/auth";

export const signUp = async (name: string, email: string, password: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/",
    },
    asResponse: true,
  });
  const data = await result.json();
  if (!result.ok) {
    return {
      success: false,
      data,
    };
  }

  return {
    success: true,
  };
};
