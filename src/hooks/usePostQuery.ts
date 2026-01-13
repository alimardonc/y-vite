import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface UsePostProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  mutationKey?: unknown[];
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">;
}

export const usePostHook = <TData, TVariables>({
  mutationFn,
  mutationKey = [],
  onSuccess,
  onError,
  options,
}: UsePostProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });

      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      onError?.(error, variables);
    },
    ...options,
  });
};
