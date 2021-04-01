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
    selectedPersonTemp: "",
    selectedDebtId: 0,
    selectedPersonPageBack: 'Zurück',
    selectedPersonPageTitle: 'Neu',
    dateCloseButton: "Schließen",
    isPositive: null,
    isPositiveTemp: null,
    amount: "0.00",
    amountTemp: "0.00",
    description: "",
    descriptionTemp: "",
    selectedDay: new Date().getDate(),
    selectedDayTemp: new Date().getDate(),
    selectedMonth: new Date().getMonth()+1,
    selectedMonthTemp: new Date().getMonth()+1,
    selectedYear: new Date().getFullYear(),
    selectedYearTemp: new Date().getFullYear(),
    archived: false,
    archivedTemp: false,
    picture: "",
    pictureTemp: "",
    currentPosition: {
      lat: 0,
      lng: 0
    },
    position: {
      lat: 0,
      lng: 0
    },
    positionTemp: {
      lat: 0,
      lng: 0
    }
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
    updateSelectedPersonTemp(state, value) {
      state.selectedPersonTemp = value;
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
    updateDateCloseButton(state, value) {
      state.dateCloseButton = value;
    },
    updateIsPositive(state, value) {
      state.isPositive = value;
    },
    updateIsPositiveTemp(state, value) {
      state.isPositiveTemp = value;
    },
    updateAmount(state, value) {
      state.amount = value;
    },
    updateAmountTemp(state, value) {
      state.amountTemp = value;
    },
    updateDescription(state, value) {
      state.description = value;
    },
    updateDescriptionTemp(state, value) {
      state.descriptionTemp = value;
    },
    updateSelectedDay(state, value) {
      state.selectedDay = value;
    },
    updateSelectedDayTemp(state, value) {
      state.selectedDayTemp = value;
    },
    updateSelectedMonth(state, value) {
      state.selectedMonth = value;
    },
    updateSelectedMonthTemp(state, value) {
      state.selectedMonthTemp = value;
    },
    updateSelectedYear(state, value) {
      state.selectedYear = value;
    },
    updateSelectedYearTemp(state, value) {
      state.selectedYearTemp = value;
    },
    updateArchived(state, value) {
      state.archived = value;
    },
    updateArchivedTemp(state, value) {
      state.archivedTemp = value;
    },
    toggleArchivedInDebts(state, value) {
      state.debts[value].archived = !state.debts[value].archived;
    },
    deleteDebt(state, value) {
      state.debts.splice(value, 1);
    },
    toggleSetting(state, value) {
      state.settings[value].checked = !state.settings[value].checked;
    },
    updatePosition(state, value) {
      state.position = value;
    },
    updatePositionTemp(state, value) {
      state.positionTemp = value;
    },
    updatePicture(state, value) {
      state.picture = value;
    },
    updatePictureTemp(state, value) {
      state.pictureTemp = value;
    },
    updateCurrentPosition(state, value) {
      state.currentPosition = value;
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
    updateSelectedPersonTemp(context, value) {
      context.commit("updateSelectedPersonTemp", value);
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
    updateDateCloseButton(context, value) {
      context.commit("updateDateCloseButton", value);
    },
    updateIsPositive(context, value) {
      context.commit("updateIsPositive", value);
    },
    updateIsPositiveTemp(context, value) {
      context.commit("updateIsPositiveTemp", value);
    },
    updateAmount(context, value) {
      context.commit("updateAmount", value);
    },
    updateAmountTemp(context, value) {
      context.commit("updateAmountTemp", value);
    },
    updateDescription(context, value) {
      context.commit("updateDescription", value);
    },
    updateDescriptionTemp(context, value) {
      context.commit("updateDescriptionTemp", value);
    },
    updateSelectedDay(context, value) {
      context.commit("updateSelectedDay", value);
    },
    updateSelectedDayTemp(context, value) {
      context.commit("updateSelectedDayTemp", value);
    },
    updateSelectedMonth(context, value) {
      context.commit("updateSelectedMonth", value);
    },
    updateSelectedMonthTemp(context, value) {
      context.commit("updateSelectedMonthTemp", value);
    },
    updateSelectedYear(context, value) {
      context.commit("updateSelectedYear", value);
    },
    updateSelectedYearTemp(context, value) {
      context.commit("updateSelectedYearTemp", value);
    },
    updateArchived(context, value) {
      context.commit("updateArchived", value);
    },
    updateArchivedTemp(context, value) {
      context.commit("updateArchivedTemp", value);
    },
    toggleArchivedInDebts(context, value) {
      context.commit("toggleArchivedInDebts", value);
    },
    deleteDebt(context, value) {
      context.commit("deleteDebt", value);
    },
    toggleSetting(context, value) {
      context.commit("toggleSetting", value);
    },
    updatePosition(context, value) {
      context.commit("updatePosition", value);
    },
    updatePositionTemp(context, value) {
      context.commit("updatePositionTemp", value);
    },
    updatePicture(context, value) {
      context.commit("updatePicture", value);
    },
    updatePictureTemp(context, value) {
      context.commit("updatePictureTemp", value);
    },
    updateCurrentPosition(context, value) {
      context.commit("updateCurrentPosition", value);
    }
  }
})