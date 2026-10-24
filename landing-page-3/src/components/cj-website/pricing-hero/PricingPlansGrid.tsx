'use client';

import { Fragment, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import StatusSection from '../pricing-section/StatusSection';
import PricingPlanCard from './PricingPlanCard';
import { getProductsVersions } from '@/services/subscription';
import { checkoutSubscription } from '@/services/billing';
import { formatPlanFeatures, getBestYearlyDiscount } from '@/lib/utils';
import { getDiscountForPlan } from '@/lib/discount-utils';
import { discountEnable } from '@/lib/feature-flags';
import { QUERY_KEYS } from '@/utils/api-query-keys';
import type { SessionPayload } from '@/lib/auth';

interface PlanEntry {
  productId: number;
  name: string;
  description: string;
  monthly: { id: number; price: number; periodDays: number } | null;
  annual: { id: number; price: number; periodDays: number } | null;
}

interface PricingPlansGridProps {
  session: SessionPayload | null;
  defaultBilling?: 'monthly' | 'annual';
}

const TRUST_ITEMS = [
  '7 days free trial',
  'No credit card required',
  'Cancel anytime',
  'After the trial your account pauses, your history is never deleted.',
];

export default function PricingPlansGrid({
  session,
  defaultBilling = 'annual',
}: PricingPlansGridProps) {
  const router = useRouter();
  const [billing, setBilling] = useState<'monthly' | 'annual'>(defaultBilling);
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_VERSIONS],
    queryFn: getProductsVersions,
  });

  const transformedPlans = useMemo(() => {
    if (!products || products.length === 0) return [];

    const plansMap = products.reduce((acc, item) => {
      if (!item.is_active || !item.product?.is_active) return acc;

      const productId = item.product.id;
      if (!acc.has(productId)) {
        acc.set(productId, {
          productId,
          name: item.product.name,
          description: item.product.description || '',
          monthly: null,
          annual: null,
        });
      }

      const plan = acc.get(productId)!;
      if (item.is_monthly) {
        plan.monthly = {
          id: item.id,
          price: parseFloat(item.price_amount),
          periodDays: item.product_period_days,
        };
      } else if (item.is_annual) {
        plan.annual = {
          id: item.id,
          price: parseFloat(item.price_amount),
          periodDays: item.product_period_days,
        };
      }

      return acc;
    }, new Map<number, PlanEntry>());

    return Array.from(plansMap.values()).sort(
      (a, b) => (a.monthly?.price ?? 0) - (b.monthly?.price ?? 0)
    );
  }, [products]);

  const { mutate: checkoutMutate } = useMutation<{ url: string }, Error, number>({
    mutationFn: (planId: number) => checkoutSubscription({ price_id: planId }),
    onSuccess: (data) => {
      if ((data as any)?.checkout_mode === 'redirect') {
        window.location.href = data.url;
      } else {
        toast.success('You already have an active subscription.');
      }
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const handleGetStarted = (planId: number) => {
    if (processingPlanId === planId) return;
    setProcessingPlanId(planId);

    if (!session?.access_token) {
      toast.info('Please login to continue');
      router.push('/login');
      setProcessingPlanId(null);
      return;
    }

    checkoutMutate(planId, {
      onSettled: () => setProcessingPlanId(null),
    });
  };

  const yearlySaving = products
    ? getBestYearlyDiscount(products)
    : { discountPercent: 0, isUpTo: false };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1 rounded-[16px] border-[1.5px] border-white/10 bg-dark-card p-1">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-[12px] px-5 py-3 font-inter-tight text-[14px] font-medium transition-colors ${
              billing === 'monthly' ? 'bg-glow-blue text-white' : 'bg-transparent text-white/50'
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() => setBilling('annual')}
            className={`flex items-center gap-2 rounded-[12px] px-3 py-3 font-inter-tight text-[14px] font-medium transition-colors ${
              billing === 'annual' ? 'bg-glow-blue text-white' : 'bg-transparent text-white/50'
            }`}
          >
            <span>Yearly</span>
            {yearlySaving.discountPercent > 0 && (
              <span
                className={`rounded-full px-2 py-1 font-inter-tight text-[8px] font-normal text-white ${
                  billing === 'annual' ? 'bg-white/25' : 'bg-white/20'
                }`}
              >
                {yearlySaving.isUpTo ? 'UP TO ' : ''}
                {yearlySaving.discountPercent}% SAVE
              </span>
            )}
          </button>
        </div>

        {yearlySaving.discountPercent > 0 && (
          <p className="font-inter-tight text-[14px] font-normal text-white/50">
            Billed annually - {yearlySaving.isUpTo ? 'up to ' : ''}
            {yearlySaving.discountPercent}% off the monthly price.
          </p>
        )}
      </div>

      {isLoading ? (
        <StatusSection isLoading as="h2" title="" />
      ) : isError || !products ? (
        <StatusSection isError as="h2" title="" />
      ) : transformedPlans.length === 0 ? (
        <StatusSection message="No pricing plans available at the moment." as="h2" title="" />
      ) : (
        <div className="-mt-10 flex w-full flex-col gap-4 md:flex-row md:justify-center">
          {transformedPlans
            .flatMap((plan) => {
              const currentPricing = billing === 'monthly' ? plan.monthly : plan.annual;
              return currentPricing ? [{ plan, currentPricing }] : [];
            })
            .map(({ plan, currentPricing }) => {
              const { features } = formatPlanFeatures(products, plan.productId);
              const highlighted = plan.name?.trim().toLowerCase() === 'pro';

              return (
                <div key={plan.productId} className="flex w-full flex-1 md:max-w-[403px]">
                  <PricingPlanCard
                    planName={plan.name}
                    description={plan.description}
                    price={currentPricing.price}
                    billing={billing}
                    monthlyPrice={plan.monthly?.price ?? null}
                    annualPrice={plan.annual?.price ?? null}
                    discount={
                      discountEnable
                        ? getDiscountForPlan(products, plan.name, billing === 'annual')
                        : null
                    }
                    features={features}
                    highlighted={highlighted}
                    isLoading={processingPlanId === currentPricing.id}
                    onCtaClick={() => handleGetStarted(currentPricing.id)}
                  />
                </div>
              );
            })}
        </div>
      )}

      <div className="flex flex-col items-center gap-1.5">
        <p className="max-w-[980px] text-center font-inter-tight text-[14px] leading-[150%] font-normal text-white/50">
          Every plan includes the full journal, dashboard, public profile, and encrypted storage.
          Plans differ mainly by accounts, advanced analytics, and ClearQuant AI.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
          {TRUST_ITEMS.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/30" />}
              <span className="font-inter-tight text-[14px] font-normal text-white/50">{item}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
