import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    persons: [],
    selectedPerson: "",
    selectedPersonPageBack: 'Zurück',
    selectedPersonPageTitle: 'Neu',
    timeCloseButton: "Schließen",
    isGreen: null,
    amount: null,
    description: "",
    selectedDay: new Date().getDate(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  },
  mutations: {
    updatePersons(state, value) {
      state.persons = value;
    },
    updateSelectedPerson(state, value) {
      state.selectedPerson = value;
    },
    updateSelectedPersonPageBack(state, value) {
      state.selectedPersonPageBack = value;
    },
    updateSelectedPersonPageTitle(state, value) {
      state.selectedPersonPageTitle = value;
    },
    updateTimeCloseButton(state, value) {
      state.timeCloseButton = value;
    },
    updateIsGreen(state, value) {
      state.isGreen = value;
    },
    updateAmount(state, value) {
      state.amount = value;
    },
    updateDescription(state, value) {
      state.description = value;
    },
    updateSelectedDay(state, value) {
      state.selectedDay = value;
    },
    updateSelectedMonth(state, value) {
      state.selectedMonth = value;
    },
    updateSelectedYear(state, value) {
      state.selectedYear = value;
    },
  },
  actions: {
    updatePersons(context, value) {
      context.commit("updatePersons", value);
    },
    updateSelectedPerson(context, value) {
      context.commit("updateSelectedPerson", value);
    },
    updateSelectedPersonPageBack(context, value) {
      context.commit("updateSelectedPersonPageBack", value);
    },
    updateSelectedPersonPageTitle(context, value) {
      context.commit("updateSelectedPersonPageTitle", value);
    },
    updateTimeCloseButton(context, value) {
      context.commit("updateTimeCloseButton", value);
    },
    updateIsGreen(context, value) {
      context.commit("updateIsGreen", value);
    },
    updateAmount(context, value) {
      context.commit("updateAmount", value);
    },
    updateDescription(context, value) {
      context.commit("updateDescription", value);
    },
    updateSelectedDay(context, value) {
      context.commit("updateSelectedDay", value);
    },
    updateSelectedMonth(context, value) {
      context.commit("updateSelectedMonth", value);
    },
    updateSelectedYear(context, value) {
      context.commit("updateSelectedYear", value);
    },
  }
})
