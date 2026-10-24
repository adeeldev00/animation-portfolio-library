export type PlanDiscount = {
  discount_percentage: number;
  discount_amount: number;
};

export function getPlanDiscount(): PlanDiscount | null {
  return null;
}

export function getDiscountForPlan(
  _products?: unknown,
  _planName?: string,
  _isAnnual?: boolean
): PlanDiscount | null {
  return null;
}

export function calculateDiscountedPrice(originalPrice: number, discountAmount: number): number {
  return Math.max(0, originalPrice - discountAmount);
}
