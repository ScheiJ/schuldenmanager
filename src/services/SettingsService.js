import { Api, responseNetworkErrorDuringOffline } from "@/services/Api";

const fetchSettings = () => {
  return Api().get("settings");
};

const setSettings = (params) => {
  return Api().put("setting/" + params._id, params).catch(err => responseNetworkErrorDuringOffline(err));
};

export { fetchSettings, setSettings };