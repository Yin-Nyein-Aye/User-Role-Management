import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem,updateItem } from "../features/data/dataService";
import { Product } from "@/types/product";

export const useCreateData = <T>(endpoint: string) => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn: (payload: { id?: number; data: Partial<T> }) => { 
            console.log(payload)
            if (!payload.id) {
                return createItem<T>(endpoint, payload);
            }
            return updateItem<T>(endpoint, payload.id, payload.data);
        }, 
        onMutate: async (payload) => { 
            await queryClient.cancelQueries({ queryKey: [endpoint] }); 
            const previousData = queryClient.getQueryData([endpoint]); 
            queryClient.setQueryData([endpoint], (old: any) => { 
                if (!old) return old; 
                if (payload.id) { 
                    return { ...old, 
                        [endpoint]: old[endpoint].map((item: any) => 
                            item.id === payload.id ? { ...item, ...payload.data } : item 
                    ), 
                }; 
            } else { 
                return { 
                    ...old, 
                    [endpoint]: [ 
                        { id: Date.now(), ...payload.data } as T,
                         ...old[endpoint], 
                        ],
                    }; 
                } 
            }); 
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