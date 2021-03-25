import { Api, responseNetworkErrorDuringOffline } from "@/services/Api";

export default {
  fetchSettings() {
    return Api().get("settings");
  },

  setSettings(params) {
    return Api().put("setting/" + params._id, params).catch(err => responseNetworkErrorDuringOffline(err));
  },
};
