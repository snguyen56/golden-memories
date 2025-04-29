import TextInput from "@/components/TextInput";

function page() {
  return (
    <div className="grid place-items-center">
      <form className="flex w-[400px] flex-col gap-8 rounded-xl border p-8">
        <div>
          <h2 className="text-2xl font-bold text-black">Login</h2>
          <p className="text-sm">
            Enter your email below to login to your account
          </p>
        </div>
        <TextInput type="email" name="email" id="email" label="email" />
        <TextInput
          type="password"
          name="password"
          id="password"
          label="password"
        />
        <button
          type="submit"
          className="h-9 w-24 place-self-end rounded-lg border bg-black text-white transition-all ease-in-out hover:bg-zinc-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default page;
