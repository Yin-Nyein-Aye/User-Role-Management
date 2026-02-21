import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../features/data/dataService";

export const useDeleteData = <T>(endpoint :string ) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteItem(endpoint, id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [endpoint] });

      const previousData = queryClient.getQueryData([endpoint] );

      queryClient.setQueryData([endpoint],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            [endpoint]: old[endpoint].filter((item: any) => item.id !== id),
          };
        }
      );

      return { previousData };
    },

   onError: (_err, _id, context) => { 
    if (context?.previousData) { 
      queryClient.setQueryData([endpoint], context.previousData); 
    } 
  }, 
  onSettled: () => { 
    queryClient.invalidateQueries({ 
      queryKey: [endpoint] 
    }); 
  }, 
}); 
}