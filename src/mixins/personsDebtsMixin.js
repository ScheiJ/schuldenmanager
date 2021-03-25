import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["searchInput", "selectedDebt", "debts", "selectedPerson"]),
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
            }, initial);
            if(debtsOfPerson) return debtsOfPerson.toString();
            else return "0";
        },
        filterPersons() {
            if(this.$route.path === "/debtsOfOnePerson") return [this.selectedPerson];
            let personsToReturn = [];
            this.debts.forEach(debt => {
              if(!personsToReturn.includes(debt.person) && this.fullfillCriterias(debt)) {
                personsToReturn.push(debt.person);
              }
            })      
            return personsToReturn;
        },
        filterDebts(person) {
            return this.debts.filter(debt => {
              return (debt.person === person && this.fullfillCriterias(debt));
            })
        },
        partOfSearch(word) {
            if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
            else return false;
        },
        fullfillCriterias(debt) {
            return (this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived));
        }
    }
  };