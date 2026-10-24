import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPriceWithSymbol = (amount: string | number, currency: string): string => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) return '0.00';

  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  return `${symbols[currency] || currency}${num.toFixed(2)}`;
};

export const isPopularPlan = (productName: string): boolean => {
  return productName.toLowerCase() === 'pro' || productName.toLowerCase() === 'enterprise';
};

interface PricePeriod {
  is_monthly: boolean;
  is_annual: boolean;
}

export const planPeriod = (price?: PricePeriod): string => {
  if (price?.is_monthly) {
    return 'Monthly';
  } else if (price?.is_annual) {
    return 'Annually';
  } else {
    return 'Custom Plan';
  }
};

export function calculateYearlyDiscount(monthlyPrice: number, yearlyPrice: number) {
  if (monthlyPrice <= 0 || yearlyPrice <= 0) {
    return { discountAmount: 0, discountPercent: 0 };
  }

  const totalMonthly = monthlyPrice * 12;
  const discountAmount = totalMonthly - yearlyPrice;
  const discountPercent = (discountAmount / totalMonthly) * 100;

  return {
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    discountPercent: parseFloat(discountPercent.toFixed(0)),
  };
}

interface ProductsType {
  id?: number;
  product_id?: number;
  product_period_days?: number;
  product?: {
    id?: number;
    name?: string;
    description?: string;
    is_active?: boolean;
    descriptive_features?: string[];
  };
  is_monthly?: boolean;
  is_annual?: boolean;
  is_active?: boolean;
  price_amount?: string;
}

export const getYearlyDiscount = (plans: ProductsType[], planName: string) => {
  if (!plans || plans.length === 0) return { discountAmount: 0, discountPercent: 0 };

  const monthlyPlan = plans.find(
    (p) => p.product?.name === planName && p.is_monthly && p.is_active && p.product?.is_active
  );

  const annualPlan = plans.find(
    (p) => p.product?.name === planName && p.is_annual && p.is_active && p.product?.is_active
  );

  if (!monthlyPlan || !annualPlan) return { discountAmount: 0, discountPercent: 0 };

  const monthly = parseFloat(monthlyPlan.price_amount ?? '0');
  const yearly = parseFloat(annualPlan.price_amount ?? '0');

  if (Number.isNaN(monthly) || Number.isNaN(yearly) || monthly <= 0) {
    return { discountAmount: 0, discountPercent: 0 };
  }

  return calculateYearlyDiscount(monthly, yearly);
};

export function formatPlanFeatures(products: ProductsType[], productId: number) {
  const productData = products.find((item) => item.product_id === productId);
  const features = productData?.product?.descriptive_features || [];
  const formattedFeatures = features.map((feature: string) => ({
    text: feature,
  }));

  return {
    features: formattedFeatures,
  };
}

export function getBestYearlyDiscount(plans: ProductsType[] | null | undefined) {
  const savings = new Map<number, number>();
  for (const annual of plans ?? []) {
    if (!annual.is_annual || !annual.is_active || !annual.product?.is_active) continue;
    const productId = annual.product_id ?? annual.product?.id;
    const monthly = plans?.find(
      (p) => (p.product_id ?? p.product?.id) === productId && p.is_monthly && p.is_active
    );
    const monthlyPrice = parseFloat(monthly?.price_amount ?? '');
    const annualPrice = parseFloat(annual.price_amount ?? '');
    if (Number.isNaN(monthlyPrice) || Number.isNaN(annualPrice) || productId === undefined) continue;
    const { discountPercent } = calculateYearlyDiscount(monthlyPrice, annualPrice);
    if (discountPercent > 0) savings.set(productId, discountPercent);
  }
  const values = Array.from(savings.values());
  if (values.length === 0) return { discountPercent: 0, isUpTo: false };
  const best = Math.max(...values);
  return { discountPercent: best, isUpTo: values.some((v) => v !== best) };
}
