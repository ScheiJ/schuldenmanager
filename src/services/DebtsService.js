import { Api, responseNetworkErrorDuringOffline } from "@/services/Api";

export default {
  fetchAllDebts() {
    return Api().get("debts");
  },

  addDebt(params) {
    return Api().post("debt", params).catch(err => responseNetworkErrorDuringOffline(err));
  },

  updateDebt(params) {
    return Api().put("debt/" + params._id, params).catch(err => responseNetworkErrorDuringOffline(err));
  },

  toggleArchiveDebt(params) {
    return Api().put("toggle-archive-debt/" + params.id, params).catch(err => responseNetworkErrorDuringOffline(err));
  },

  deleteDebt(id) {
    return Api().delete("debt/" + id).catch(err => responseNetworkErrorDuringOffline(err));
  },

  
};
