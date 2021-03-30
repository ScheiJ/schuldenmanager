import offenArchiviertMixin from "./offenArchiviertMixin";
import filterDebtsMixin from "./filterDebtsMixin";
export default {
    mixins: [offenArchiviertMixin, filterDebtsMixin],
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
        }
    }
  };