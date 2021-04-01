<template>
  <v-row justify="center" class="mt-5">
    <v-date-picker 
    v-model="picker"
    locale="de-de"
    year-icon="mdi-calendar-blank"
    @change="$store.dispatch('updateDateCloseButton', 'Fertig')"
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'Date',
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10)
      }
    },
    computed: {
      ...mapState(["selectedDayTemp", "selectedMonthTemp", "selectedYearTemp", "dateCloseButton"])
    },
    mounted: function () {
        this.picker = new Date(this.selectedYearTemp, this.selectedMonthTemp, Number(this.selectedDayTemp)+1).toISOString().substr(0, 10);
    },
    beforeDestroy: function () {
        this.$store.dispatch('updateDateCloseButton', "Schließen")
    },
    watch: {
      picker: function() {
        this.$store.dispatch('updateSelectedDayTemp', this.picker.substr(8, 2));
        this.$store.dispatch('updateSelectedMonthTemp', Number(this.picker.substr(5, 2))-1);
        this.$store.dispatch('updateSelectedYearTemp', this.picker.substr(0, 4));
      }
    }
}
</script>
