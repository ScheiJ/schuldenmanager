import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["selectedDay", "selectedMonth", "selectedYear"]),
        selectedDate: function () {
            var d = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
            var month = new Array();
            month[0] = "Jan.";
            month[1] = "Feb.";
            month[2] = "März";
            month[3] = "Apr.";
            month[4] = "Mai";
            month[5] = "Juni";
            month[6] = "Juli";
            month[7] = "Aug.";
            month[8] = "Sept.";
            month[9] = "Okt.";
            month[10] = "Nov.";
            month[11] = "Dez.";
            return this.selectedDay + ". " + month[d.getMonth()];
        }
    }
  };