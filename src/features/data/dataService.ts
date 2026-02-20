import api from "../../services/api.js";
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

export const getDataByIdApi = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};
