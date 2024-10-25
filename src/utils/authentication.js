import { jwtDecode } from "jwt-decode";
import { addToken, getToken, removeToken } from "./data_storage";
import { login, logout } from "../services/accountService";

export const isAuthenticated = async () => {
  const token = await getToken();
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  return new Date(decodedToken.exp).getTime() < new Date().getTime();
};

export const loginUser = async (model) => {
  try {
    const res = await login(model);
    const { access } = res.data;
    await addToken(access);
    return res;
  } catch (err) {
    return { status: 500 };
  }
};
