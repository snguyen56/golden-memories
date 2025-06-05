"use server";
import { auth } from "@/utils/auth";

export const signin = async (
  email: string,
  password: string,
  rememberMe: boolean = false,
) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
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
