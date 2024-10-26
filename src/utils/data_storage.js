import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  return AsyncStorage.getItem("token");
};

export const addToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const getRefreshToken = async () => {
  return AsyncStorage.getItem("refresh");
}

export const addRefreshToken = async (token) => {
  await AsyncStorage.setItem("refresh", token);
}

export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem("refresh");
}