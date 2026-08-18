export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('en-IN')} km`;
}

export function calculateEMI(principal: number, annualRate: number = 9.5, tenureMonths: number = 60): number {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function calculateMarketEstimate(
  originalPriceEstimate: number,
  year: number,
  km: number,
  brand: string,
  condition: 'Excellent' | 'Good' | 'Fair' = 'Excellent'
): { min: number; max: number; fair: number } {
  const currentYear = 2026;
  const age = Math.max(0, currentYear - year);
  
  // Luxury German brands depreciate ~12-15% yr 1, ~10% thereafter. Japanese ~8-10%.
  const isLuxury = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Jaguar', 'Land Rover', 'Volvo'].includes(brand);
  const depreciationPerYear = isLuxury ? 0.11 : 0.08;
  
  let remainingFactor = Math.pow(1 - depreciationPerYear, age);
  
  // KM penalty
  const excessKm = Math.max(0, km - (age * 12000));
  const kmPenalty = Math.min(0.15, (excessKm / 100000) * 0.1);
  remainingFactor = Math.max(0.25, remainingFactor - kmPenalty);

  if (condition === 'Good') remainingFactor *= 0.94;
  if (condition === 'Fair') remainingFactor *= 0.86;

  const fair = Math.round(originalPriceEstimate * remainingFactor / 10000) * 10000;
  const min = Math.round(fair * 0.94 / 10000) * 10000;
  const max = Math.round(fair * 1.06 / 10000) * 10000;

  return { min, max, fair };
}
