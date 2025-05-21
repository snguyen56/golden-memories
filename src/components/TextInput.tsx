import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  type: string;
  name: Path<TFieldValues>;
  id: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
};

function TextInput<TFieldValues extends FieldValues>({
  type,
  name,
  id,
  label = "",
  placeholder = "",
  register,
  error,
}: Props<TFieldValues>) {
  return (
    <div className="relative h-8">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name)}
        className={`peer w-full border-b-1 pb-1 text-black outline-0 hover:border-b-2 ${error ? "border-red-500" : "border-zinc-400"}`}
      />
      {label && (
        <label
          htmlFor={id}
          className="absolute left-0 -z-1 transition-all duration-200 not-peer-placeholder-shown:-translate-y-5 not-peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-black"
        >
          {label}
        </label>
      )}
      <span
        className={`absolute bottom-0.5 left-0 w-full scale-0 transition-all duration-200 peer-focus:scale-100 peer-focus:border-b-2 ${error ? "border-red-500" : "border-black"}`}
      ></span>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default TextInput;
