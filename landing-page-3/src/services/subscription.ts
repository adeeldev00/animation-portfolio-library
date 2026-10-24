export interface StaticPrice {
  id: number;
  product_id: number;
  price_amount: string;
  price_currency: string;
  product_period_days: number;
  is_active: boolean;
  is_annual: boolean;
  is_monthly: boolean;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    description: string;
    account_limit: number;
    descriptive_features: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

const NOW = new Date().toISOString();

function plan(opts: {
  productId: number;
  name: string;
  description: string;
  accountLimit: number;
  features: string[];
  monthlyPrice: string;
  annualPrice: string;
}): StaticPrice[] {
  const product = {
    id: opts.productId,
    name: opts.name,
    description: opts.description,
    account_limit: opts.accountLimit,
    descriptive_features: opts.features,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
  };
  return [
    {
      id: opts.productId * 10 + 1,
      product_id: opts.productId,
      price_amount: opts.monthlyPrice,
      price_currency: 'USD',
      product_period_days: 30,
      is_active: true,
      is_annual: false,
      is_monthly: true,
      created_at: NOW,
      updated_at: NOW,
      product,
    },
    {
      id: opts.productId * 10 + 2,
      product_id: opts.productId,
      price_amount: opts.annualPrice,
      price_currency: 'USD',
      product_period_days: 365,
      is_active: true,
      is_annual: true,
      is_monthly: false,
      created_at: NOW,
      updated_at: NOW,
      product,
    },
  ];
}

const STATIC_PRICES: StaticPrice[] = [
  ...plan({
    productId: 1,
    name: 'Starter',
    description: 'For traders getting started with journaling.',
    accountLimit: 1,
    features: ['1 connected account', 'Core journal & dashboard', 'Public profile'],
    monthlyPrice: '9.00',
    annualPrice: '86.00',
  }),
  ...plan({
    productId: 2,
    name: 'Pro',
    description: 'For active traders who want full analytics.',
    accountLimit: 5,
    features: [
      '5 connected accounts',
      'Advanced analytics',
      'ClearQuant AI',
      'Priority support',
    ],
    monthlyPrice: '29.00',
    annualPrice: '278.00',
  }),
  ...plan({
    productId: 3,
    name: 'Enterprise',
    description: 'For funds and teams managing many accounts.',
    accountLimit: 25,
    features: [
      'Unlimited connected accounts',
      'Team seats',
      'Dedicated support',
      'Custom reporting',
    ],
    monthlyPrice: '99.00',
    annualPrice: '950.00',
  }),
];

export async function getProductsVersions(): Promise<StaticPrice[]> {
  return STATIC_PRICES;
}
