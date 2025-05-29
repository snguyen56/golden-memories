"use client";
import TextInput from "@/components/TextInput";
import AuthForm from "../../components/AuthForm";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "./actions";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    fullName: z.string().trim().nonempty({ message: "Full name is required" }),
    email: z
      .string()
      .trim()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type signUp = z.infer<typeof signupSchema>;
// https://res.cloudinary.com/dshapo0iy/image/upload/v1748369070/golden-memories/avatar.png

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = (data: signUp) => {
    signUp(data.fullName, data.email, data.password);
    router.refresh();
    router.push("/");
  };
  return (
    <div className="mb-14 grid place-items-center">
      <AuthForm handleSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="text-center text-2xl font-bold text-black">Sign Up</h2>
          <p className="mt-1 text-sm">
            Enter your data below to create to your account
          </p>
        </div>
        <div className="flex flex-col gap-y-10">
          <TextInput
            type="fullName"
            name="fullName"
            id="fullName"
            label="Full Name"
            register={register}
            error={errors.fullName}
          />
          <TextInput
            type="email"
            name="email"
            id="email"
            label="Email"
            register={register}
            error={errors.email}
          />
          <TextInput
            type="password"
            name="password"
            id="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
          />
        </div>
        <button
          type="submit"
          className="h-9 cursor-pointer rounded-lg border bg-black text-white transition-all ease-in-out hover:bg-zinc-800"
        >
          Sign Up
        </button>
      </AuthForm>
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-black hover:text-zinc-700">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Page;
