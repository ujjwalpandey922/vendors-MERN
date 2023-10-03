import { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  error?: string;
};
const Input = ({
  placeholder,
  name,
  value,
  onChange,
  required,
  error,
}: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        required={required}
        className="px-4 py-2 outline-none border border-[#C0C0C0] bg-inherit focus:border-b-blue rounded-md w-full focus:border-blue-800"
      />
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
};

export default Input;
