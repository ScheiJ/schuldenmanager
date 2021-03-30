import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: `http://localhost:8000`
  });
};
const responseNetworkErrorDuringOffline = err => {
  if(err.response) return "Error";
  else if (err.request) return "Network Error";
};

export { Api, responseNetworkErrorDuringOffline };