import { mapState } from "vuex";
import fullfillCriteriasMixin from './fullFillCriteriasMixin';
export default {
    computed: {
        ...mapState(["debts"]),   
    },
    mixins: [fullfillCriteriasMixin],
    methods: {
        filterDebts(person) {
            return this.debts.filter(debt => {
              return (debt.person === person && this.fullfillCriterias(debt));
            })
        }
    }
  };