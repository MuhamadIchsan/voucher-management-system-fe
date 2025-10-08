import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = (errors[name]?.message as string) || "";

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`mt-1 block w-full p-2 border rounded-md shadow-sm text-black ${
          fieldError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
    </div>
  );
};

export default FormInput;
