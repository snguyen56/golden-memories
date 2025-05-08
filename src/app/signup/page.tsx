"use client";
import TextInput from "@/components/TextInput";
import AuthForm from "../../components/AuthForm";
import Link from "next/link";

function page() {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("Form submitted");
  };
  return (
    <main className="grid place-items-center">
      <AuthForm handleSubmit={handleSubmit}>
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
          />
          <TextInput type="email" name="email" id="email" label="Email" />
          <TextInput
            type="password"
            name="password"
            id="password"
            label="Password"
          />
          <TextInput
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
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
    </main>
  );
}

export default page;
