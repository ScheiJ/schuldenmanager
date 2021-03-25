<template>
  <div>
    <v-row>
      <v-col class="pa-2">
        <v-divider dark></v-divider>
        <v-text-field
          placeholder="Suchen"
          prepend-inner-icon="mdi-magnify"
          dense
          solo
          flat
          background-color="grey lighten-2"
          v-model="searchInput"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-item-group mandatory class="mb-3 px-2" v-model="selectedDebt">
      <v-row style="background-color: #E0E0E0; border-radius: 5px 5px">
        <v-col cols="4" class="pa-1">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              :color="active ? '#FFFFFF' : '#E0E0E0'"
              class="d-flex align-center mx-auto"
              height="25"
              @click="toggle"
            >
            <v-card-text class="text-center">Offen</v-card-text>
            </v-card>
          </v-item>
        </v-col>
        <v-col cols="4" class="pa-1">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              :color="active ? '#FFFFFF' : '#E0E0E0'"
              class="d-flex align-center"
              height="25"
              @click="toggle"
            >
            <v-card-text class="text-center">Archiviert</v-card-text>
            </v-card>
          </v-item>
        </v-col>
        <v-col cols="4" class="pa-1">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              :color="active ? '#FFFFFF' : '#E0E0E0'"
              class="d-flex align-center"
              height="25"
              @click="toggle"
            >
            <v-card-text class="text-center">Alle</v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <PersonsAndDebts v-if="easyList" />
    <OnlyPersonsAndAmount v-if="!easyList" />
    <v-row v-if="showTotalAmount">
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item dark style="background-color: #37474F; position: fixed; left: 0; bottom: 0; width: 100%;">
            <v-list-item-content>
              <v-list-item-title>Gesamt:</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon v-if="total >= 0">
              {{ total }},00 €
              <v-icon class="circleSmall ml-3"></v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="total < 0">
              {{ total.toString().substring(1) }},00 €
              <v-icon class="circleSmall ml-3 red"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import PersonsAndDebts from "@/components/PersonsAndDebts.vue";
  import OnlyPersonsAndAmount from "@/components/OnlyPersonsAndAmount.vue";
  import personsDebtsMixin from "../mixins/personsDebtsMixin";
  export default {
    name: 'Home',
    mixins: [personsDebtsMixin],
    components: {
      PersonsAndDebts,
      OnlyPersonsAndAmount
    },
    data: () => ({

    }),
    computed: {
      ...mapState(["persons", "debts", "searchInput", "selectedDebts", "selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived", "showTotalAmount", "showAllFirst", "easyList"]),
      searchInput: {
        get() {
          return this.$store.state.searchInput;
        },
        set(value) {
          this.$store.commit('updateSearchInput', value);
        }
      },
      selectedDebt: {
        get() {
          return this.$store.state.selectedDebt;
        },
        set(value) {
          this.$store.commit('updateSelectedDebt', value);
        }
      },
      total: function () {
        let initial = 0;
        return this.persons.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(this.getAmountOfPerson(currentValue));
        },initial)
      },
    },
    mounted: function() {
      this.resetStates();
      //let scrollTo = document.getElementById('contentDebts');
      //scrollTo.scrollIntoView({behavior: 'smooth'});
    },
    methods: {
      resetStates() {
        this.$store.dispatch('updateSelectedDebtId', 0);
        this.$store.dispatch("updateSelectedDebt", 0);
        this.$store.dispatch('updateIsPositive', null);
        this.$store.dispatch('updateAmount', "0.00");
        this.$store.dispatch('updateDescription', "");
        this.$store.dispatch('updateSelectedDay', new Date().getDate());
        this.$store.dispatch('updateSelectedMonth', new Date().getMonth());
        this.$store.dispatch('updateSelectedYear', new Date().getFullYear());
        this.$store.dispatch('updateSelectedPerson', "");
        this.$store.dispatch('updateArchived', false);
      },
    }
  }
</script>