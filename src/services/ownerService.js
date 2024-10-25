import config from "./config.json";
import http from "./httpService";

export const challenge = (leaderboardType) => {
  return http.get(
    `${config.url}/api/v1/owner/challenge?leaderBoardType=${leaderboardType}`
  );
};

export const getDailyInfo = () => {
  return http.get(`${config.url}/api/v1/owner/daily_info/search`);
};

export const addDailyInfo = (model) => {
  return http.put(
    `${config.url}/api/v1/owner/daily_info/`,
    JSON.stringify(model)
  );
};

export const getHistory = (month = 0) => {
  return http.get(`${config.url}/api/v1/owner/history?month=${month}`);
};

export const getTotal = () => {
  return http.get(`${config.url}/api/v1/owner/history/total`);
};

export const getProgress = () => {
  return http.get(`${config.url}/api/v1/owner/progress`);
}

export const getFriends = () => {
  return http.get(`${config.url}/api/v1/owner/invited_users`);
}

export const deleteReport = (id) => {
  return http.delete(`${config.url}/api/v1/owner/history/delete/${id}/`);
}