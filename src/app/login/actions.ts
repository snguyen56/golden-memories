"use server";
import { auth } from "@/utils/auth";

export const signin = async (
  email: string,
  password: string,
  rememberMe: boolean = false,
) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
    },
    asResponse: true,
  });
};
