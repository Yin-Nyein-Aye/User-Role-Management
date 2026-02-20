import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataApi } from "../features/data/dataService";
import { useEffect } from "react";

export const usePaginatedQuery = ({
  endpoint,
  page,
  limit,
  filters = {},
  sortBy = null,
  order = "asc",
}) => {
  const queryClient = useQueryClient();  
  const query = useQuery({
    queryKey: [endpoint, page, limit, filters, sortBy, order],
    queryFn: () =>
      getDataApi({
        endpoint,
        page,
        limit,
        filters,
        sortBy,
        order,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
  
  useEffect(() => {
    if (!query.data?.total) return;

    const totalPages = Math.ceil(query.data.total / limit);

    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: [endpoint, page + 1, limit, filters, sortBy, order],
        queryFn: () =>
          getDataApi({
            endpoint,
            page: page + 1,
            limit,
            filters,
            sortBy,
            order,
          }),
      });
    }
  }, [query.data, page, limit, endpoint, filters, sortBy, order, queryClient]);

  return query;
};
