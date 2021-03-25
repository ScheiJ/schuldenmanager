<template>
  <v-row justify="center" class="mt-5">
    <v-date-picker 
    v-model="picker"
    locale="de-de"
    year-icon="mdi-calendar-blank"
    @change="$store.dispatch('updateTimeCloseButton', 'Fertig')"
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'Time',
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10)
      }
    },
    computed: {
      ...mapState(["selectedPerson", "selectedDay", "selectedMonth", "selectedYear", "timeCloseButton"])
    },
    mounted: function () {
        this.picker = new Date(this.selectedYear, this.selectedMonth, Number(this.selectedDay)+1).toISOString().substr(0, 10);
    },
    beforeDestroy: function () {
        this.$store.dispatch('updateTimeCloseButton', "Schließen")
    },
    watch: {
      picker: function() {
        this.$store.dispatch('updateSelectedDay', this.picker.substr(8, 2));
        this.$store.dispatch('updateSelectedMonth', Number(this.picker.substr(5, 2))-1);
        this.$store.dispatch('updateSelectedYear', this.picker.substr(0, 4));
      }
    }
}
</script>
