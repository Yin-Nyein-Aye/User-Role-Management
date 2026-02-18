import api from "../../services/api";

export const getDataApi = async (page = 1, limit = 8, endpoint,signal) => {
  const skip = (page - 1) * limit;
  try {
    const res = await api.get(`/${endpoint}`, {
      params: { limit, skip },
      signal});
    return res.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const getDataByIdApi = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};
