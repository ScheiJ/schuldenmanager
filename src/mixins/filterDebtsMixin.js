/**
 * Mixin to filter debts to compare selected person and uses the fullfillCriteria Mixin
 */
import { mapState } from "vuex";
import fullfillCriteriasMixin from './fullFillCriteriasMixin';
export default {
    computed: {
        ...mapState(["debts"]),   
    },
    mixins: [fullfillCriteriasMixin],
    methods: {
        // check each debt and return when person matches and criterias are fullfilled
        filterDebts(person) {
            return this.debts.filter(debt => {
              return (debt.person === person && this.fullfillCriterias(debt));
            })
        }
    }
  };