"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LeaseInputSchema, LeaseInputType } from "@/schemas/leaseSchema";
import { calculateLease } from "@/lib/leaseCalculations";
import { useState, useEffect } from "react";
import { Lease, LeaseInput } from "@/types/Lease";

export function LeaseForm() {
  const form = useForm<LeaseInputType>({
    resolver: zodResolver(LeaseInputSchema),
    defaultValues: {
      ManufacturerSuggestedRetailPrice: "0",
      NegotiatedPricePlusFees: "0",
      DownPayment: "0",
      Rebates: "0",
      TradeInValue: "0",
      LeaseTerm: "0",
      MoneyFactor: "0",
      SalesTax: "0",
      ResidualValue: "0",
    },
    mode: "onChange",
  });

  const [leaseDetails, setLeaseDetails] = useState<Lease | null>(null);

  const formValues = form.watch();

useEffect(() => {
    const valid = LeaseInputSchema.safeParse(formValues).success;
    if (valid) {
        const floatValues = Object.fromEntries(
            Object.entries(formValues).map(([key, value]) => [key, parseFloat(value)])
        );
        console.log(floatValues)
        const details = calculateLease(floatValues);
        if (JSON.stringify(details) !== JSON.stringify(leaseDetails)) {
            setLeaseDetails(details);
        }
    } else {
        setLeaseDetails(null); 
    }
}, [formValues]);

const onSubmit = (data: LeaseInputType) => {
    form.reset();
    console.log(data);
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <FormField
          control={form.control}
          name="ManufacturerSuggestedRetailPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer Suggested Retail Price</FormLabel>
              <FormControl>
                <Input type="number" 
                {...field}
                placeholder="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="NegotiatedPricePlusFees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Negotiated Price + Fees</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DownPayment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Down Payment</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Rebates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rebates</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="TradeInValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trade-In Value</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LeaseTerm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lease Term (months)</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="MoneyFactor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Money Factor (decimal)</FormLabel>
              <FormControl>
                <Input type="number" step="0.0001" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="SalesTax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Tax (percentage)</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ResidualValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residual Value (percentage of MSRP)</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Reset</Button>
      </form>

      {leaseDetails && (
        <div className="mt-8 px-8 mb-8">
          <h2 className="font-bold text-lg mb-2">Lease Details</h2>
          <p>Adjusted Capitalized Cost: ${leaseDetails.AdjustedCapitalizedCost.toFixed(2)}</p>
          <p>Capitalized Cost Reduction: ${leaseDetails.CapitalizedCostReduction.toFixed(2)}</p>
          <p>Monthly Depreciation: ${leaseDetails.MonthlyDepreciation.toFixed(2)}</p>
          <p>Monthly Finance Charge: ${leaseDetails.MonthlyFinanceCharge.toFixed(2)}</p>
          <p>Monthly Sales Tax: ${leaseDetails.MonthlySalesTax.toFixed(2)}</p>
          <p>Total Monthly Payment: ${leaseDetails.TotalMonthlyPayment.toFixed(2)}</p>
          <p>Total Lease Cost: ${leaseDetails.TotalLeaseCost.toFixed(2)}</p>
        </div>
      )}
    </Form>
  );
}
