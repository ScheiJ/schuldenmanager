/**
 * Mixin that has the value for 'offen' and 'archiviert'. Represents the user selection on home page
 */
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["selectedDebt"]),
        offen: function() {
            return this.selectedDebt === 0 || this.selectedDebt === 2;
        },
        archiviert: function() {
            return this.selectedDebt === 1 || this.selectedDebt === 2;
        }     
    }
  };