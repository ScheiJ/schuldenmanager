import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: [
      {
        name: "showAllFirst",
        checked: false,
        prompt: ""
      },
      {
        name: "showTotalAmount",
        checked: false,
        prompt: ""
      },
      {
        name: "easyList",
        checked: false,
        prompt: ""
      },
    ],
    debts: [],
    persons: [],
    searchInput: "",
    selectedDebt: 0,
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
    updateSettings(state, value) {
      state.settings = value;
    },
    updateDebts(state, value) {
      state.debts = value;
    },
    updatePersons(state, value) {
      state.persons = value;
    },
    updateSearchInput(state, value) {
      state.searchInput = value;
    },
    updateSelectedDebt(state, value) {
      state.selectedDebt = value;
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
    toggleArchivedInDebts(state, value) {
      state.debts[value].archived = !state.debts[value].archive;
    },
    deleteDebt(state, value) {
      state.debts.splice(value, 1);
    },
    toggleSetting(state, value) {
      state.settings[value].checked = !state.settings[value].checked;
    }
  },
  actions: {
    updateSettings(context, value) {
      context.commit("updateSettings", value);
    },
    updateDebts(context, value) {
      context.commit("updateDebts", value);
    },
    updatePersons(context, value) {
      context.commit("updatePersons", value);
    },
    updateSearchInput(context, value) {
      context.commit("updateSearchInput", value);
    },
    updateSelectedDebt(context, value) {
      context.commit("updateSelectedDebt", value);
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
    toggleArchivedInDebts(context, value) {
      context.commit("toggleArchivedInDebts", value);
    },
    deleteDebt(context, value) {
      context.commit("deleteDebt", value);
    },
    toggleSetting(context, value) {
      context.commit("toggleSetting", value);
    }
  }
})