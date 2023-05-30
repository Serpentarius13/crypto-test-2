export const useBasedLazyFetch: typeof useLazyFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  return useLazyFetch(request, { baseURL: config.public.baseUrl, ...opts });
};
