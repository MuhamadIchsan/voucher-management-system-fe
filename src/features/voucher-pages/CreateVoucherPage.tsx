import { FormProvider, useForm } from "react-hook-form";
import VoucherFormFields from "./components/VoucherFormField";
import { useAddVoucher } from "./hooks/voucherMutation";
import { useNavigate } from "react-router";
import { formVoucherSchema, type FormVoucherType } from "./types/form-type";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateVoucherPage = () => {
  const navigate = useNavigate();
  const methods = useForm<FormVoucherType>({
    resolver: zodResolver(formVoucherSchema),
    defaultValues: {},
  });
  const createVoucherMutation = useAddVoucher();
  const navigation = useNavigate();

  const onSubmit = (data: FormVoucherType) => {
    createVoucherMutation.mutate(data, {
      onSuccess: (res) => {
        navigation("/vouchers");
        toast.success(res.message ?? "Create Voucher Success");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? "Create Voucher failed");
      },
    });
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <VoucherFormFields />
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-40 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={createVoucherMutation.isPending}
            >
              Create
            </button>
            <button
              type="button"
              className="w-40 py-2 px-4  bg-red-600 text-white"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateVoucherPage;
