import { z } from "zod";

export const formVoucherSchema = z.object({
  voucher_code: z
    .string()
    .min(3, "Voucher code must be at least 3 characters")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Voucher code must contain only letters and numbers (no spaces)"
    ),
  discount_percent: z
    .number({ error: "Discount must be a number" })
    .min(1, "Minimum discount is 1%")
    .max(100, "Maximum discount is 100%"),
  expiry_date: z.string().nonempty("Expiry date is required"),
});

export type FormVoucherType = z.infer<typeof formVoucherSchema>;
