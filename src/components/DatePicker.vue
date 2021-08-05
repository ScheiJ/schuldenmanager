<template>
    <v-date-picker 
    v-model="picker"
    locale="de-de"
    :year-icon="svgCalendarBlank"
    :prev-icon="svgChevronLeft"
    :next-icon="svgChevronRight"
    full-width
    @change="$store.dispatch('updateDateCloseButton', 'Fertig')"
    ></v-date-picker>
</template>

<script>
/**
 * Date picker for debt time and reminder time
 */
import { mdiCalendarBlank, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { mapState } from "vuex";
export default {
    name: 'DatePicker',
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        svgCalendarBlank: mdiCalendarBlank,
        svgChevronLeft: mdiChevronLeft,
        svgChevronRight: mdiChevronRight
      }
    },
    computed: {
      ...mapState(["selectedDayTemp", "selectedMonthTemp", "selectedYearTemp", "selectedDayReminder", "selectedMonthReminder", "selectedYearReminder", "dateCloseButton"]),
      day() {
        return this.$route.path === "/date" ? this.selectedDayTemp : this.selectedDayReminder;
      },
      month() {
        return this.$route.path === "/date" ? this.selectedMonthTemp : this.selectedMonthReminder;
      },
      year() {
        return this.$route.path === "/date" ? this.selectedYearTemp : this.selectedYearReminder;
      }
    },
    mounted: function () {
        this.picker = new Date(this.year, this.month, Number(this.day)+1).toISOString().substr(0, 10);
    },
    beforeDestroy: function () {
        this.$store.dispatch('updateDateCloseButton', "Schließen");
    },
    watch: {
        picker: function() {
            let endWord = this.$route.path === '/date' ? 'Temp' : 'Reminder';
            this.$store.dispatch('updateSelectedDay' + endWord, this.picker.substr(8, 2));
            this.$store.dispatch('updateSelectedMonth' + endWord, Number(this.picker.substr(5, 2))-1);
            this.$store.dispatch('updateSelectedYear' + endWord, this.picker.substr(0, 4));
        },
    },
    methods: {
        resetPicker() {
            let now = new Date();
            this.picker = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1).toISOString().substr(0, 10);
        }
    }
}
</script>
