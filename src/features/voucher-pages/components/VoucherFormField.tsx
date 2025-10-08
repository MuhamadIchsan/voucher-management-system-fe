import { useFormContext } from "react-hook-form";
import FormInput from "../../../core/components/FormInput";

const VoucherFormFields = () => {
  const { register } = useFormContext();
  return (
    <>
      <FormInput
        label="Voucher Code"
        type="text"
        placeholder="Enter your Voucher Code"
        {...register("voucher_code")}
      />

      <FormInput
        label="Percentage"
        type="number"
        placeholder="Enter Percentage Value"
        {...register("discount_percent", { valueAsNumber: true })}
      />

      <FormInput
        label="Expiry Date"
        type="date"
        placeholder="Enter Expiry Date"
        {...register("expiry_date")}
      />
    </>
  );
};

export default VoucherFormFields;
