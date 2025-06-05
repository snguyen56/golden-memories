"use client";
import TextInput from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signin } from "./actions";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import AuthForm from "@/components/AuthForm";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
  remember: z.boolean().optional(),
});

type loginInputs = z.infer<typeof loginSchema>;

function Page() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = async (data: loginInputs) => {
    try {
      await signin(data.email, data.password, data.remember);
      authClient.$store.notify("$sessionSignal"); // may be a temporary fix until real bug gets resolved
      router.push("/");
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      setError("email", { type: "server", message: err.message });
    }
  };

  return (
    <div className="mb-14 grid place-items-center">
      <AuthForm handleSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="text-center text-2xl font-bold text-black">Login</h2>
          <p className="mt-1 text-sm">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-10">
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
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            {...register("remember")}
            className="peer size-3.5 appearance-none rounded border checked:bg-black"
          />
          <label htmlFor="remember">Remember me</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="absolute hidden size-3.5 text-white peer-checked:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="h-9 cursor-pointer rounded-lg border bg-black text-white transition-all ease-in-out hover:bg-zinc-800"
        >
          Login
        </button>
      </AuthForm>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-black hover:text-zinc-700">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Page;
