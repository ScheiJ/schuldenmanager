import { mapState } from "vuex";
import fullfillCriteriasMixin from './fullFillCriteriasMixin';
export default {
    computed: {
        ...mapState(["debts", "selectedPerson"]),   
    },
    mixins: [fullfillCriteriasMixin],
    methods: {
        filterPersons() {
            if(this.$route.path === "/debtsOfOnePerson") return [this.selectedPerson];
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