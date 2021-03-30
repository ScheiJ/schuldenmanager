import { Api, responseNetworkErrorDuringOffline } from "@/services/Api";

const fetchAllDebts = () => {
  return Api().get("debts");
};

const addDebt = (params) => {
  return Api().post("debt", params).catch(err => responseNetworkErrorDuringOffline(err));
};

const updateDebt = (params) => {
  return Api().put("debt/" + params._id, params).catch(err => responseNetworkErrorDuringOffline(err));
};

const toggleArchiveDebt = (params) => {
  return Api().put("toggle-archive-debt/" + params.id, params).catch(err => responseNetworkErrorDuringOffline(err));
};

const deleteDebt = (id) => {
  return Api().delete("debt/" + id).catch(err => responseNetworkErrorDuringOffline(err));
};

export { fetchAllDebts, addDebt, updateDebt, toggleArchiveDebt, deleteDebt }