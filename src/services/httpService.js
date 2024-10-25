import axios from "axios";
import { getToken } from "../utils/data_storage";
import config from "./config.json";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
// axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

axios.interceptors.request.use(
  async (request) => {
    const token = await getToken();
    if (token) request.headers.setAuthorization(`Bearer ${token}`);
    return request;
  },
  (error) => console.error("Request Error: ", error)
);

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  const { status, message, data } = error.response;
  if (!expectedErrors) {
    // console.error("Server error: ", { status, message, data });
  }
  return Promise.reject({status, message, data});
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
