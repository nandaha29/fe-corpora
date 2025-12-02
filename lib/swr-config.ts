import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 2000, // 2 detik - prevent duplicate requests
  focusThrottleInterval: 5000, // 5 detik - throttle focus revalidation
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  keepPreviousData: true, // Keep previous data while fetching new data
  refreshInterval: 0, // Disable auto refresh by default (can be overridden per hook)
};

