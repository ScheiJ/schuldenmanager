/**
 * Mixin to check search input and check if several criterias are matched, uses the offenArchiviert Mixin
 */
import { mapState } from "vuex";
import offenArchiviertMixin from "../mixins/offenArchiviertMixin";
export default {
    computed: {
        ...mapState(["searchInput"]),   
    },
    mixins: [offenArchiviertMixin],
    methods: {
        //check if a word matches text search input of user
        partOfSearch(word) {
            if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
            else return false;
        },
        //if descritption is part of search || person is part of search and all debts are selected || just open debts are selected and the current debt is not archived || just archvied debts are selected and the current debt is archived
        fullfillCriterias(debt) {
            return (this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived));
        }
    }
  };