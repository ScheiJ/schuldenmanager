import { mapState } from "vuex";
import offenArchiviertMixin from "../mixins/offenArchiviertMixin";
export default {
    computed: {
        ...mapState(["searchInput"]),   
    },
    mixins: [offenArchiviertMixin],
    methods: {
        partOfSearch(word) {
            if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
            else return false;
        },
        fullfillCriterias(debt) {
            return (this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived));
        }
    }
  };