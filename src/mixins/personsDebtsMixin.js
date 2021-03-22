import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["persons", "searchInput", "selectedDebt", "debts", "selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived", "showTotalAmount", "showAllFirst", "easyList"]),
        offen: function() {
            return this.selectedDebt === 0 || this.selectedDebt === 2;
        },
        archiviert: function() {
            return this.selectedDebt === 1 || this.selectedDebt === 2;
        }
    },
    methods: {
        getAmountOfPerson(person) {
            let initial = 0
            let debtsOfPerson = this.filterDebts(person);
            debtsOfPerson = debtsOfPerson.reduce((accumulator, currentValue) => {
                if(!(this.offen && this.archiviert && currentValue.archived)) {
                if(!currentValue.isPositive) return accumulator - parseInt(currentValue.amount.$numberDecimal);
                return accumulator + parseInt(currentValue.amount.$numberDecimal);
                } else return accumulator;
            }, initial)
            if(debtsOfPerson) return debtsOfPerson.toString();
            else return "0";
        },
        filterPersons() {
            if(this.$route.path === "/debtsOfOnePerson") return [this.selectedPerson];
            let personsToReturn = [];
            this.debts.forEach(debt => {
              if((this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && !personsToReturn.includes(debt.person) && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived))) {
                personsToReturn.push(debt.person);
              }
            })      
            return personsToReturn
        },
        filterDebts(person) {
            return this.debts.filter(debt => {
              if((this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && debt.person === person && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived))) {
                return debt;
              }
            })
        },
        partOfSearch(word) {
            if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
            else return false;
        },
    }
  };