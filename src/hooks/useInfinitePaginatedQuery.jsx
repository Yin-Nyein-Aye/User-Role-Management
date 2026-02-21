import { useInfiniteQuery } from "@tanstack/react-query";
import { getDataApi } from "../features/data/dataService";

export const useInfinitePaginatedQuery = ({
  endpoint,
  limit,
  filters = {},
  sortBy = null,
  order = "asc",
}) => {
    return useInfiniteQuery({
        queryKey: [endpoint, limit, filters, sortBy, order],
        queryFn: ({ pageParam = 1 }) =>
        getDataApi({
            endpoint,
            page: pageParam,
            limit,
            filters,
            sortBy,
            order,
        }),

        getNextPageParam: (lastPage, allPages) => {
        const totalPages = Math.ceil(lastPage.total / limit);
        const nextPage = allPages.length + 1;

        return nextPage <= totalPages ? nextPage : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });
};
