import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: `https://schuldenmanager-backend.herokuapp.com`
  });
};
const responseNetworkErrorDuringOffline = err => {
  if(err.response) return "Error";
  else if (err.request) return "Network Error";
};

export { Api, responseNetworkErrorDuringOffline };