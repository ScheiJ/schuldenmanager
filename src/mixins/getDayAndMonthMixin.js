export default {
    methods: {
        selectedDate(year, monthVar, day) {
            let d = new Date(year, monthVar, day);
            let month = new Array();
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
            return d.getDate() + ". " + month[d.getMonth()];
        }
    }
  };