export interface LeaseInput {
    ManufacturerSuggestedRetailPrice: number;
    NegotiatedPricePlusFees: number;
    DownPayment: number;
    Rebates: number;
    TradeInValue: number;
    LeaseTerm: number;
    MoneyFactor: number;
    SalesTax: number;
    ResidualValue: number;
}
  
  // Complete lease details including calculated fields
export interface Lease extends LeaseInput {
    AdjustedCapitalizedCost: number;
    CapitalizedCostReduction: number;
    MonthlyDepreciation: number;
    MonthlyFinanceCharge: number;
    MonthlySalesTax: number;
    TotalMonthlyPayment: number;
    TotalLeaseCost: number;
}
  