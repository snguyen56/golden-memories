import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";
import { useState } from "react";

type ComboBoxProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  id: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  options: string[];
};

function ComboBox<TFieldValues extends FieldValues>({
  name,
  id,
  label = "",
  placeholder = "",
  register,
  error,
  options,
}: ComboBoxProps<TFieldValues>) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const {
    onChange: formOnChange,
    onBlur: formOnBlur,
    ref: formRef,
    name: formName,
  } = register(name);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (value: string) => {
    const syntheticEvent = {
      target: { name: formName, value },
    };
    formOnChange(syntheticEvent);
    setQuery(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative h-8">
        <input
          id={id}
          name={formName}
          ref={formRef}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            formOnChange(e);
            setIsOpen(true);
          }}
          onBlur={(e) => {
            formOnBlur(e);
            setTimeout(() => setIsOpen(false), 100);
          }}
          onFocus={() => {
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (!isOpen) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                filteredOptions.length
                  ? (prev + 1) % filteredOptions.length
                  : 0,
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                filteredOptions.length
                  ? (prev - 1 + filteredOptions.length) % filteredOptions.length
                  : 0,
              );
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (filteredOptions[highlightedIndex]) {
                handleSelect(filteredOptions[highlightedIndex]);
              }
            } else if (e.key === "Escape") {
              setIsOpen(false);
            } else if (e.key === "Home") {
              e.preventDefault();
              setHighlightedIndex(0);
            } else if (e.key === "End") {
              e.preventDefault();
              setHighlightedIndex(filteredOptions.length - 1);
            }
          }}
          value={query}
          className={`peer w-full border-b pb-1 text-black outline-none hover:border-b-2 ${
            error ? "border-red-500" : "border-zinc-400"
          }`}
        />

        {label && (
          <label
            htmlFor={id}
            className={`absolute left-0 -z-1 transition-all duration-200 not-peer-placeholder-shown:-translate-y-5 not-peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:text-sm ${error ? "text-red-500" : "peer-focus:text-black"} `}
          >
            {label}
          </label>
        )}
        <span
          className={`absolute bottom-0.5 left-0 w-full scale-0 transition-all duration-200 peer-focus:scale-100 peer-focus:border-b-2 ${error ? "border-red-500" : "border-black"} `}
        />
        {error && <p className="text-sm text-red-600">{error.message}</p>}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-2 py-1 hover:bg-zinc-100 ${index === highlightedIndex ? "bg-zinc-200" : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComboBox;
