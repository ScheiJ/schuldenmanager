/**
 * returns date in day.month.year format
 */
export default {
    methods: {
        getNormalFormat(date){
            let newDate = new Date(date);
            let year = newDate.getFullYear();
            let month = newDate.getMonth()+1;
            if (month.toString().length === 1) month = "0" + month;
            let day = newDate.getDate();
            if (day.toString().length === 1) day = "0" + day; 
            return day + "." + month + "." +  year;
        },
    }
  };