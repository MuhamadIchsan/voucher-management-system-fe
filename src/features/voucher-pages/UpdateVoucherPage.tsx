import { FormProvider, useForm } from "react-hook-form";
import VoucherFormFields from "./components/VoucherFormField";
import { useUpdateVoucher } from "./hooks/voucherMutation";
import { useNavigate, useParams } from "react-router";
import { formVoucherSchema, type FormVoucherType } from "./types/form-type";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindVouchers } from "./hooks/useVouchers";
import { useEffect } from "react";

const UpdateVoucherPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFindVouchers(Number(id ?? 0));
  const updateVoucherMutation = useUpdateVoucher();

  const methods = useForm<FormVoucherType>({
    resolver: zodResolver(formVoucherSchema),
    defaultValues: {
      voucher_code: "",
      discount_percent: 0,
      expiry_date: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      const expiryDate = data.data.expiry_date
        ? new Date(data.data.expiry_date).toISOString().split("T")[0]
        : "";

      methods.reset({
        voucher_code: data.data.voucher_code,
        discount_percent: data.data.discount_percent,
        expiry_date: expiryDate,
      });
    }
  }, [data, methods]);

  const onSubmit = (formData: FormVoucherType) => {
    if (id) {
      updateVoucherMutation.mutate(
        {
          id: +id,
          payload: formData,
        },
        {
          onSuccess: (res) => {
            navigate("/vouchers");
            toast.success(res.message ?? "Update Voucher Success");
          },
          onError: (err: any) => {
            toast.error(
              err?.response?.data?.message ?? "Update Voucher failed"
            );
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-10 w-full bg-gray-300 rounded" />
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-10 w-full bg-gray-300 rounded" />
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-10 w-full bg-gray-300 rounded" />
        <div className="h-10 w-40 bg-gray-300 rounded" />
      </div>
    );
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <VoucherFormFields />
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-40 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={updateVoucherMutation.isPending}
            >
              Update
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

export default UpdateVoucherPage;
