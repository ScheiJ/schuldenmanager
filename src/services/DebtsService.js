import Api from "@/services/Api";

export default {
  fetchAllDebts() {
    return Api().get("debts");
  },

  addDebt(params) {
    return Api().post("debt", params).catch(err => {
      if(err.response) {
        return "Error";
      } else if (err.request) {
        return "Network Error";
      }
    });
  },

  updateDebt(params) {
    return Api().put("debt/" + params._id, params).catch(err => {
      if(err.response) {
        return "Error";
      } else if (err.request) {
        return "Network Error";
      }
    });
  },

  toggleArchiveDebt(params) {
    return Api().put("toggle-archive-debt/" + params.id, params);
  },

  deleteDebt(id) {
    return Api().delete("debt/" + id);
  },
};
