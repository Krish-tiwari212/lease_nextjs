import { z } from 'zod';

export const LeaseInputSchema = z.object({
  ManufacturerSuggestedRetailPrice: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  NegotiatedPricePlusFees: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  DownPayment: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  Rebates: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  TradeInValue: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  LeaseTerm: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  MoneyFactor: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  SalesTax: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
  ResidualValue: z.string().refine((val) => !Number.isNaN(parseInt(val)), {
    message: "Expected number, received a string"
  }),
});

export type LeaseInputType = z.infer<typeof LeaseInputSchema>;