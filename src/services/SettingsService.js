import Api from "@/services/Api";

export default {
  fetchSettings() {
    return Api().get("settings");
  },

  setSettings(params) {
    return Api().post("settings", params);
  },
};
