import { Lease, LeaseInput } from "@/types/Lease";

export function calculateLease(input: LeaseInput): Lease {
  const { ManufacturerSuggestedRetailPrice, NegotiatedPricePlusFees, DownPayment, Rebates, TradeInValue, LeaseTerm, MoneyFactor, SalesTax, ResidualValue } = input;

  const CapitalizedCostReduction = DownPayment + Rebates + TradeInValue;
  const AdjustedCapitalizedCost = NegotiatedPricePlusFees - CapitalizedCostReduction;
  const ResidualValueAmount = (ResidualValue / 100) * ManufacturerSuggestedRetailPrice;
  const MonthlyDepreciation = (AdjustedCapitalizedCost - ResidualValueAmount) / LeaseTerm;
  const MonthlyFinanceCharge = (AdjustedCapitalizedCost + ResidualValueAmount) * MoneyFactor;
  const MonthlySalesTax = (MonthlyDepreciation + MonthlyFinanceCharge) * (SalesTax);
  const TotalMonthlyPayment = MonthlyDepreciation + MonthlyFinanceCharge + MonthlySalesTax;
  const TotalLeaseCost = TotalMonthlyPayment * LeaseTerm;

  return {
    ManufacturerSuggestedRetailPrice,
    NegotiatedPricePlusFees,
    AdjustedCapitalizedCost,
    DownPayment,
    Rebates,
    TradeInValue,
    LeaseTerm,
    MoneyFactor,
    SalesTax,
    ResidualValue,
    CapitalizedCostReduction,
    MonthlyDepreciation,
    MonthlyFinanceCharge,
    MonthlySalesTax,
    TotalMonthlyPayment,
    TotalLeaseCost,
  };
}
