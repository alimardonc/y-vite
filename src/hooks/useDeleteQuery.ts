import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface UseDeleteProps<TVariables> {
  mutationFn: (variables: TVariables) => Promise<void>;
  mutationKey?: unknown[];
  optimisticDelete?: (variables: TVariables) => void;
  onSuccess?: (variables: TVariables) => void;
  options?: Omit<UseMutationOptions<void, Error, TVariables>, "mutationFn">;
}

export const useDeleteHook = <TVariables>({
  mutationFn,
  mutationKey = [],
  optimisticDelete,
  onSuccess,
  options,
}: UseDeleteProps<TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: (variables) => {
      optimisticDelete?.(variables);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      onSuccess?.(variables);
    },
    ...options,
  });
};
