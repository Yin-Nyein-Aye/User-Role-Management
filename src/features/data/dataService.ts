import api from "../../services/api";
import { GetDataParams, PaginatedResponse } from "../../types/dataParams.ts"

//redux
// export const getDataApi = async (page = 1, limit = 8, endpoint,signal) => {
//   const skip = (page - 1) * limit;
//   try {
//     const res = await api.get(`/${endpoint}`, {
//       params: { limit, skip },
//       signal});
//     return res.data;
//   } catch (error) {
//     console.error("API fetch error:", error);
//     throw error;
//   }
// };

//react query
export const getDataApi = async<T>({
  endpoint, 
  page = 1, 
  limit = 8,
  filters = {},
  sortBy = null,
  order = "asc",
}:GetDataParams):  Promise<PaginatedResponse<T>> => {
  const skip = (page - 1) * limit;
  const params = {
    limit,
    skip,
    ...filters,
  };

  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order;
  }

  try {
  const res = await api.get(`/${endpoint}`, {params});
  return res.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

export const createItem = async <T>(
  endpoint : string,
  data: Partial<T>
): Promise<T> => {
  const res = await api.post(`/${endpoint}/add`, data);
  console.log("API response:", res.data); // 👈 log the response
  return res.data;
};

export const updateItem = async <T> (
  endpoint : string,
  id: number,
  data: Partial<T>
): Promise<T> => {
  const res = await api.put(`/${endpoint}/${id}`, data);
  return res.data;
};

// export const deleteItem = async (
//   endpoint : string,
//   id: number
// ): Promise<void> => {
//   await api.delete(`/${endpoint}/${id}`);
// };

export const deleteItem = async <T>(
  endpoint: string,
  id: number
): Promise<T> => {
  const res = await api.delete(`/${endpoint}/${id}`);
  console.log("Delete API response:", res.data);
  return res.data; 
};

