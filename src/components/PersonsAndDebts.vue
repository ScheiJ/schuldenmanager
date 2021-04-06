<template>
    <v-row class="mb-14">
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0" role="list">
          <v-list-item-group v-for="person in filterPersons()" v-bind:key="person" class="backgroundGrey">
            <v-subheader v-if="getAmountOfPerson(person) >= 0" class="pt-10 pb-4"><strong class="mr-2">{{ person }}</strong>schuldet mir {{ getAmountOfPerson(person).replace(".", ",") }},00 €</v-subheader>
            <v-subheader v-if="getAmountOfPerson(person) < 0" class="pt-10 pb-4"><strong class="mr-2">{{ person }}</strong>hat mir {{ getAmountOfPerson(person).replace(".", ",").substring(1) }},00 € geliehen</v-subheader>
              <v-list-item v-for="debt in filterDebts(person)" :key="debt._id" @click="showFinishedDebt(debt)" class="backgroundWhite" style="border-bottom: 3px solid #EEEEEE">
                <v-list-item-icon  v-bind:class="{ 'mt-5': debt.description !== '' }">
                    <div v-if="!debt.archived" class="circleSmall" v-bind:class="{ red: debt.isPositive === false }"></div>
                    <v-icon v-if="debt.archived">{{ svgCheck }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ getNormalFormat(debt.date) }}<v-icon v-if="debt.reminder" class="ml-2">{{ svgClockTimeFour }}</v-icon></v-list-item-subtitle>
                  <v-list-item-title>{{ debt.description }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon v-bind:style="debt.archived ? 'color: grey' : 'color: black'">
                  {{ debt.amount.$numberDecimal.replace(".", ",") }} €
                  <v-icon
                  class="ml-3"
                  small
                  color="#BDBDBD"
                  >{{ svgGreaterThan }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
</template>

<script>
import { mdiCheck, mdiGreaterThan, mdiClockTimeFour } from '@mdi/js';
import getAmountOfPersonMixin from "../mixins/getAmountOfPersonMixin";
import filterDebtsMixin from "../mixins/filterDebtsMixin";
import filterPersonsMixin from "../mixins/filterPersonsMixin";
import getFullNormalDateMixin from "../mixins/getFullNormalDateMixin";
export default {
  name: "PersonsAndDebts",
  mixins: [getAmountOfPersonMixin, filterDebtsMixin, filterPersonsMixin, getFullNormalDateMixin],
  data: () => ({
    svgCheck: mdiCheck,
    svgGreaterThan: mdiGreaterThan,
    svgClockTimeFour: mdiClockTimeFour
  }),
  methods: {
      showFinishedDebt(debt) {
        this.$store.dispatch("updateSelectedDebtId", debt._id);
        this.$store.dispatch("updateSelectedPerson", debt.person);
        this.$store.dispatch("updateIsPositive", debt.isPositive);
        this.$store.dispatch("updateAmount", debt.amount.$numberDecimal);
        this.$store.dispatch("updateDescription", debt.description);
        let debtDate = debt.date;
        this.$store.dispatch("updateSelectedDay", parseInt(debtDate.substr(8, 2)));
        this.$store.dispatch("updateSelectedMonth", parseInt(debtDate.substr(5, 2))-1);
        this.$store.dispatch("updateSelectedYear", parseInt(debtDate.substr(0, 4)));
        this.$store.dispatch("updateArchived", debt.archived);
        this.$store.dispatch("updatePosition", debt.position);
        this.$store.dispatch("updatePicture", debt.picture);
        if(debt.reminder) {
          let reminderDate = new Date(debt.reminder);
          let hours = reminderDate.getHours().toString();
          hours = hours.length === 1 ? '0' + hours : hours; 
          let minutes = reminderDate.getMinutes().toString();
          minutes = minutes.length === 1 ? '0' + minutes : minutes;
          this.$store.dispatch('updateTimeReminder', hours + ':' + minutes);
          this.$store.dispatch('updateSelectedDayReminder', reminderDate.getDate());
          this.$store.dispatch('updateSelectedMonthReminder', reminderDate.getMonth());
          this.$store.dispatch('updateSelectedYearReminder', reminderDate.getFullYear());
          this.$store.dispatch('updateReminderSet', true);
        }
        this.$router.push('finishedDebt');
      },
  }
};
</script>
