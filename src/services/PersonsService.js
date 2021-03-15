import Api from "@/services/Api";

export default {
  fetchAllPersons() {
    return Api().get("persons");
  },

  addPerson(params) {
    return Api().post("person", params);
  },

  addDebt(params) {
    return Api().post("debt", params);
  },
  /*
  updateProject(params) {
    return Api().put("projects/" + params.id, params);
  },*/
};
