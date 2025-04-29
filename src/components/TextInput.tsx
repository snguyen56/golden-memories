type Props = {
  type: string;
  name: string;
  id: string;
  label: string;
};

function TextInput({ type, name, id, label }: Props) {
  return (
    <div className="relative h-8">
      <input
        type={type}
        name={name}
        id={id}
        placeholder=""
        className="peer w-full border-b-1 border-zinc-400 pb-1 text-black outline-0 hover:border-b-2"
      />
      <label
        htmlFor="id"
        className="absolute left-0 transition-all duration-200 not-peer-placeholder-shown:-translate-y-5 not-peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-black"
      >
        {label}
      </label>
      <span className="absolute bottom-[2px] left-0 w-full scale-0 border-black transition-all duration-200 peer-focus:scale-100 peer-focus:border-b-2"></span>
    </div>
  );
}

export default TextInput;
