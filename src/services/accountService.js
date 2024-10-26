import config from "./config.json";
import http from "./httpService";

export const register = (model) => {
  return http.post(
    `${config.url}/api/v1/accounts/register/`,
    JSON.stringify(model)
  );
};

export const login = (model) => {
  return http.post(
    `${config.url}/api/v1/accounts/login/`,
    JSON.stringify(model)
  );
};

export const logout = (model) => {
  return http.post(
    `${config.url}/api/v1/accounts/logout/`,
    JSON.stringify(model)
  );
};

export const getUserInfo = () => {
  return http.get(`${config.url}/api/v1/accounts/user_info`);
};

export const passwordRecovery = (model) => {
  return http.post(
    `${config.url}/api/v1/accounts/password_recovery/`,
    JSON.stringify(model)
  );
};

export const checkPasswordRecovery = (model) => {
  return http.put(
    `${config.url}/api/v1/accounts/password_recovery/anyString/`,
    JSON.stringify(model)
  );
};

export const changePassword = (model) => {
  return http.post(
    `${config.url}/api/v1/accounts/change_password/`,
    JSON.stringify(model)
  );
};

export const saveStep = (model) => {
  return http.put(
    `${config.url}/api/v1/accounts/save_step/`,
    JSON.stringify(model)
  );
};

export const updateUser = (model) => {
  return http.put(
    `${config.url}/api/v1/accounts/user_update/`,
    JSON.stringify(model)
  );
};

export const updateUserWithForm = (form) => {
  return http.put(`${config.url}/api/v1/accounts/user_update_form/`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
