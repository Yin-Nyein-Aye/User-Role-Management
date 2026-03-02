import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem,updateItem } from "../features/data/dataService";
import { Product } from "@/types/product";

type MutationPayload<T> = {
  id?: number;
  data: Partial<T>;
};

export const useCreateData = <T>(endpoint: string) => {
    const queryClient = useQueryClient();

    const isValidEndpoint = /^[a-zA-Z0-9_-]+$/.test(endpoint);
  if (!isValidEndpoint) {
    throw new Error("Invalid endpoint format.");
  }

    return useMutation({ 
        // mutationFn: (payload: { id?: number; data: Partial<T> }) => { 
        mutationFn: async (payload: MutationPayload<T>) => {
            if (!payload || typeof payload !== "object") {
                throw new Error("Invalid payload.");
            }

            if ( !payload.data ||
                typeof payload.data !== "object" ||
                Object.keys(payload.data).length === 0
            ) {
                throw new Error("Data cannot be empty.");
            }

            if (payload.id !== undefined) {
                if (
                    typeof payload.id !== "number" ||
                    payload.id <= 0 ||
                    !Number.isInteger(payload.id)
                ) {
                    throw new Error("Invalid ID.");
                }
            }
            if (!payload.id) {
                try {
                    const result = await createItem<T>(endpoint, payload);
                    if (!result) {
                        throw new Error("Invalid server response");
                    }
                    return result;
               } catch {
                console.log("catch")
                    throw new Error("An error occurred")
               }
            }
            return updateItem<T>(endpoint, payload.id, payload.data);
        }, 
        onMutate: async (payload) => { 
            await queryClient.cancelQueries({ queryKey: [endpoint] }); 
            const previousData = queryClient.getQueryData([endpoint]); 
            queryClient.setQueryData([endpoint], (old: any) => { 
                if (!old || !Array.isArray(old[endpoint])) return old;
                // if (!old) return old; 
                if (payload.id) { 
                    return { ...old, 
                        [endpoint]: old[endpoint].map((item: any) => 
                            item.id === payload.id ? { ...item, ...payload.data } : item 
                    ), 
                }; 
            } 
            
            return { 
                    ...old, 
                    [endpoint]: [ 
                        { id: Date.now(), ...payload.data } as T,
                         ...old[endpoint], 
                        ],
                    }; 
                } 
            ); 
            return { previousData }; 
        }, 
        onError: (_err, _payload, context) => { 
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
};