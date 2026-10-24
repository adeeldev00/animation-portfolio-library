export async function checkoutSubscription(_payload: {
  price_id: number;
}): Promise<{ checkout_mode: string; url: string }> {
  return { checkout_mode: 'redirect', url: '/login' };
}
