/**
 * Mixin to filter persons and uses the fullfillCriteria Mixin
 */
import { mapState } from "vuex";
import fullfillCriteriasMixin from './fullFillCriteriasMixin';
export default {
    computed: {
        ...mapState(["debts", "selectedPerson"]),   
    },
    mixins: [fullfillCriteriasMixin],
    methods: {
        filterPersons() {
            // when on debtsOfOnePerson Page => just return selectedPerson
            if(this.$route.path === "/debtsOfOnePerson") return [this.selectedPerson];
            // when not filter all debts to return personsToReturn Array with every person just once in it
            let personsToReturn = [];
            this.debts.forEach(debt => {
              if(!personsToReturn.includes(debt.person) && this.fullfillCriterias(debt)) {
                personsToReturn.push(debt.person);
              }
            })      
            return personsToReturn;
        }
    }
  };