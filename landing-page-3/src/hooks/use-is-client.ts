import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// False during SSR and hydration, true once rendering on the client. Replaces the
// `useEffect(() => setMounted(true), [])` pattern without the extra render.
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
