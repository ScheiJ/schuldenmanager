import { Api, responseNetworkErrorDuringOffline } from "@/services/Api";

const fetchAllDebts = () => {
  return Api().get("debts");
};

const addDebt = async (params) => {
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

const addImage = (params) => {
  return Api().post("image", params).catch(err => responseNetworkErrorDuringOffline(err));
};

const setReminder = (params) => {
  return Api().put("reminder/" + params.id, params).catch(err => responseNetworkErrorDuringOffline(err));
};

const subscribe = (params) => {
  return Api().post("subscribe", params).catch(err => responseNetworkErrorDuringOffline(err));
};

export { fetchAllDebts, addDebt, updateDebt, toggleArchiveDebt, deleteDebt, addImage, setReminder, subscribe }