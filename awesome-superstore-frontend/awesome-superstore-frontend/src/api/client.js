import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const client = axios.create({
  baseURL: BASE_URL,
  validateStatus: (_) => {
    return true;
  },
});

const authenticatedClient = () => {
  return axios.create({
    baseURL: BASE_URL,
    validateStatus: (_) => {
      return true;
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
};

export default authenticatedClient;
