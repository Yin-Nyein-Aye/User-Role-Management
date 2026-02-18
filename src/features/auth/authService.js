import api from "../../services/api";

// export const loginApi = (data) => {
//   return api.post("/login", data);
// };

export const registerApi = (data) => {
  return api.post("/register", data);
};

export const loginApi = async (data) => {

  const res = await api.post("/auth/login",{
    username: data.username,
    password: data.password,
  });
  if (res.data) {
    return res.data
  } else {
    throw { response: { data: "Invalid credentials" } };
  }
};
