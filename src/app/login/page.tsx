"use client";
import TextInput from "@/components/TextInput";
import Link from "next/link";

function page() {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("Form submitted");
  };

  return (
    <div className="grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex min-w-sm flex-col gap-8 rounded-xl border p-8"
      >
        <div>
          <h2 className="text-center text-2xl font-bold text-black">Login</h2>
          <p className="mt-1 text-sm">
            Enter your email below to login to your account
          </p>
        </div>
        <TextInput type="email" name="email" id="email" label="Email" />
        <TextInput
          type="password"
          name="password"
          id="password"
          label="Password"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
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
        <span className="h-px w-full bg-zinc-500"></span>
        <div className="flex w-full flex-col gap-4">
          <button
            type="button"
            className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>

              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>

              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              ></path>

              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 448 512"
            >
              <path
                fill="black"
                d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
              ></path>
            </svg>
            Continue with Twitter
          </button>
          <button
            type="button"
            className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592c.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                fill="#1877F2"
              ></path>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </form>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-black hover:text-zinc-700">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default page;
