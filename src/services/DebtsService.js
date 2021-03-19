import Api from "@/services/Api";

export default {
  fetchAllDebts() {
    return Api().get("debts");
  },

  addDebt(params) {
    return Api().post("debt", params);
  },

  toggleArchiveDebt(params) {
    return Api().put("toggle-archive-debt/" + params.id, params);
  },

  updateDebt(params) {
    return Api().put("debt/" + params.id, params);
  },

  deleteDebt(id) {
    return Api().delete("debt/" + id);
  },
};
