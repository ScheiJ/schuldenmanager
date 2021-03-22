import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showTotalAmount: false,
    showAllFirst: false,
    easyList: false,
    debts: [],
    persons: [],
    selectedPerson: "",
    selectedDebtId: 0,
    selectedPersonPageBack: 'Zurück',
    selectedPersonPageTitle: 'Neu',
    timeCloseButton: "Schließen",
    isPositive: null,
    amount: "0.00",
    description: "",
    selectedDay: new Date().getDate(),
    selectedMonth: new Date().getMonth()+1,
    selectedYear: new Date().getFullYear(),
    archived: false,
  },
  mutations: {
    updateShowTotalAmount(state, value) {
      state.showTotalAmount = value;
    },
    updateShowAllFirst(state, value) {
      state.showAllFirst = value;
    },
    updateEasyList(state, value) {
      state.easyList = value;
    },
    updateDebts(state, value) {
      state.debts = value;
    },
    updatePersons(state, value) {
      state.persons = value;
    },
    updateSelectedPerson(state, value) {
      state.selectedPerson = value;
    },
    updateSelectedDebtId(state, value) {
      state.selectedDebtId = value;
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
    updateIsPositive(state, value) {
      state.isPositive = value;
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
    updateArchived(state, value) {
      state.archived = value;
    },
  },
  actions: {
    updateShowTotalAmount(context, value) {
      context.commit("updateShowTotalAmount", value);
    },
    updateShowAllFirst(context, value) {
      context.commit("updateShowAllFirst", value);
    },
    updateEasyList(context, value) {
      context.commit("updateEasyList", value);
    },
    updateDebts(context, value) {
      context.commit("updateDebts", value);
    },
    updatePersons(context, value) {
      context.commit("updatePersons", value);
    },
    updateSelectedPerson(context, value) {
      context.commit("updateSelectedPerson", value);
    },
    updateSelectedDebtId(context, value) {
      context.commit("updateSelectedDebtId", value);
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
    updateIsPositive(context, value) {
      context.commit("updateIsPositive", value);
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
    updateArchived(context, value) {
      context.commit("updateArchived", value);
    },
  }
})