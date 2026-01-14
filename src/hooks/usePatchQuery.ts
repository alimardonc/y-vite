import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface UsePatchProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  mutationKey?: unknown[];
  optimisticUpdate?: (variables: TVariables) => void;
  onSuccess?: (data: TData, variables: TVariables) => void;
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">;
}

export const usePatchHook = <TData, TVariables>({
  mutationFn,
  mutationKey = [],
  optimisticUpdate,
  onSuccess,
  options,
}: UsePatchProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: (variables) => {
      optimisticUpdate?.(variables);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      onSuccess?.(data, variables);
    },
    ...options,
  });
};
