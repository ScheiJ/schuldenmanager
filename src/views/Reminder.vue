<template>
<div>
    <v-row justify="center" class="mt-5">
    <v-col cols="10">
      <v-menu
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        
      >
        <template v-slot:activator="{ on, attrs1 }">
          <v-text-field
            label="Datum"
            :prepend-icon="svgCalendarBlank"
            v-bind="attrs1"
            v-on="on"
            :value="dateText"
          ></v-text-field>
        </template>
        <DatePicker ref="datePicker" />
      </v-menu>
    </v-col>
  </v-row>


  <v-row justify="center" class="mt-5">
    <v-col cols="10">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeReminder"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs2 }">
          <v-text-field
            v-model="timeReminder"
            :value="timeReminder"
            label="Uhrzeit"
            :prepend-icon="svgClockTimeFourOutline"
            v-bind="attrs2"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
        format="24hr"
        v-if="menu"
        v-model="timeReminder"
        scrollable
        @change="changeTimeSelection"
        full-width
        >
        </v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
  <v-row>
      <DeleteButton v-if="reminderSet" />
  </v-row>
</div>
</template>

<script>
import { mdiCalendarBlank, mdiClockTimeFourOutline } from '@mdi/js'
import { mapState } from 'vuex';
import getFullNormalDateMixin from '@/mixins/getFullNormalDateMixin';
export default {
    name: 'Reminder',
    components: {
      DatePicker: () => import(/* webpackPrefetch: true */'@/components/DatePicker.vue'),
      DeleteButton: () => import(/* webpackPrefetch: true */'@/components/DeleteButton.vue')
    },
    mixins: [getFullNormalDateMixin],
    computed: {
        ...mapState(["timeReminder", "reminderSet", "selectedDayReminder", "selectedMonthReminder", "selectedYearReminder", "dateCloseButton", "updateDateCloseButton"]),
        dateText: function () {
            let newDate = new Date(this.selectedYearReminder, this.selectedMonthReminder, this.selectedDayReminder);
            return this.getNormalFormat(newDate);
        },
        timeReminder: {
            get() {
                return this.$store.state.timeReminder;
            },
            set(value) {
                this.$store.dispatch('updateTimeReminder', value);
            }
        },
    },
    data () {
      return {
        menu: false,
        svgCalendarBlank: mdiCalendarBlank,
        svgClockTimeFourOutline: mdiClockTimeFourOutline
      }
    },
    mounted: function() {
        this.resetTimeReminder();
    },
    beforeDestroy: function () {
        this.$store.dispatch('updateDateCloseButton', "Schließen");
    },
    watch: {
        selectedDayReminder: function() {
            this.changeDateSelection();
        },
        selectedMonthReminder: function() {
            this.changeDateSelection();
        },
        selectedYearReminder: function() {
            this.changeDateSelection();
        }
    },
    methods: {
        resetTimeReminder() {
            if(!this.timeReminder) {
                let hours = new Date().getHours().toString();
                hours = hours.length === 1 ? '0' + hours : hours;
                let minutes = new Date().getMinutes().toString();
                minutes = minutes.length === 1 ? '0' + minutes : minutes;
                this.timeReminder = hours + ':' + minutes;
            }
        },
        changeTimeSelection() {
            let now = new Date();
            let selection = new Date(this.selectedYearReminder, this.selectedMonthReminder, this.selectedDayReminder, this.timeReminder.substring(0,2), this.timeReminder.substring(3,5));
            if(selection < now) this.resetTimeReminder();
            else {
                this.$refs.menu.save(this.timeReminder);
                this.changeSelection();
            }
        },
        changeDateSelection() {
            let now = new Date();
            let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let selection = new Date(this.selectedYearReminder, this.selectedMonthReminder, this.selectedDayReminder);
            if(selection < currentDate) {
                this.$refs.datePicker.resetPicker();
                this.$store.dispatch('updateSelectedDayReminder', currentDate.getDate());
                this.$store.dispatch('updateSelectedMonthReminder', currentDate.getMonth());
                this.$store.dispatch('updateSelectedYearReminder', currentDate.getFullYear());
            } else this.changeSelection();
        },
        changeSelection() {
            this.$store.dispatch('updateReminderSet', true);
            this.$store.dispatch('updateDateCloseButton', 'Fertig');
        }
    }
}
</script>
