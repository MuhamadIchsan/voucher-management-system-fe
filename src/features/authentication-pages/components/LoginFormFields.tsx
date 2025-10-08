import { useFormContext } from "react-hook-form";
import FormInput from "../../../core/components/FormInput";

const LoginFormFields = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      {/* Email */}
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
      />

      {/* Password */}
      <FormInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
      />
    </div>
  );
};

export default LoginFormFields;
