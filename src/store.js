import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPerson: "",
    selectedPersonPageBack: 'Zurück',
    selectedPersonPageTitle: 'Neu',
  },
  mutations: {
    updateSelectedPerson(state, value) {
      state.selectedPerson = value;
    },
    updateSelectedPersonPageBack(state, value) {
      state.selectedPersonPageBack = value;
    },
    updateSelectedPersonPageTitle(state, value) {
      state.selectedPersonPageTitle = value;
    },
  },
  actions: {
    updateSelectedPerson(context, value) {
      context.commit("updateSelectedPerson", value);
    },
    updateSelectedPersonPageBack(context, value) {
      context.commit("updateSelectedPersonPageBack", value);
    },
    updateSelectedPersonPageTitle(context, value) {
      context.commit("updateSelectedPersonPageTitle", value);
    },
  }
})
