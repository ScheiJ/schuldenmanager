<template>
  <div>
    <v-row>
      <v-col class="pa-2 pt-3">
        <v-divider dark></v-divider>
        <v-text-field
          placeholder="Suchen"
          :prepend-inner-icon="svgMagnify"
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
        <v-col v-for="selection in selectionText" :key="selection" cols="4" class="pa-1">
          <v-item v-slot="{ active, toggle }">
            <v-card
              outlined
              :color="active ? '#FFFFFF' : '#E0E0E0'"
              class="d-flex align-center mx-auto"
              height="25"
              @click="toggle"
            >
            <v-card-text class="text-center">{{ selection }}</v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <PersonsAndDebts v-if="easyList.checked" />
    <OnlyPersonsAndAmount v-if="!easyList.checked" />
    <TotalAmount v-if="showTotalAmount.checked" />
  </div>
</template>

<script>
  import { mdiMagnify } from '@mdi/js';
  import { mapState } from "vuex";
  export default {
    name: 'Home',
    components: {
      PersonsAndDebts: () => import(/* webpackPrefetch: true */'@/components/PersonsAndDebts.vue'),
      OnlyPersonsAndAmount: () => import(/* webpackPrefetch: true */'@/components/OnlyPersonsAndAmount.vue'),
      TotalAmount: () => import(/* webpackPrefetch: true */'@/components/TotalAmount.vue')
    },
    data: () => ({
      selectionText: ["Offen", "Archiviert", "Alle"],
      svgMagnify: mdiMagnify,
      test: ""
    }),
    computed: {
      ...mapState(["persons", "searchInput", "selectedDebt", "selectedPerson", "selectedDebtId", "isPositive", "isPositiveTemp", "amount", "amountTemp", "description", "descriptionTemp", "selectedDay", "selectedDayTemp", "selectedMonth", "selectedMonthTemp", "selectedYear", "selectedYearTemp", "archived", "archivedTemp", "position", "positionTemp", "currentPosition", "settings", "picture", "pictureTemp"]),
      searchInput: {
        get() {
          return this.$store.state.searchInput;
        },
        set(value) {
          this.$store.dispatch('updateSearchInput', value);
        }
      },
      selectedDebt: {
        get() {
          return this.$store.state.selectedDebt;
        },
        set(value) {
          this.$store.dispatch('updateSelectedDebt', value);
        }
      },
      settings: {
        get() {
          return this.$store.state.settings;
        },
        set(value) {
          this.$store.dispatch('updateSelectedDebt', value);
        }
      },
      easyList() {
        return this.settings.find(setting => {
          if (setting.name === "easyList") return setting;
        })
      },
      showTotalAmount() {
        return this.settings.find(setting => {
          if (setting.name === "showTotalAmount") return setting;
        })
      },
      showAllFirst() {
        return this.settings.find(setting => {
          if (setting.name === "showAllFirst") return setting;
        })
      }
    },
    mounted: function() {
      this.resetStates();
    },
    methods: {
      resetStates() {
        this.$store.dispatch('updateSelectedDebtId', 0);
        this.showAllFirst.checked ? this.$store.dispatch("updateSelectedDebt", 2) : this.$store.dispatch("updateSelectedDebt", 0);
        this.$store.dispatch('updateIsPositive', null);
        this.$store.dispatch('updateIsPositiveTemp', null);
        this.$store.dispatch('updateAmount', "0.00");
        this.$store.dispatch('updateAmountTemp', "0.00");
        this.$store.dispatch('updateDescription', "");
        this.$store.dispatch('updateDescriptionTemp', "");
        this.$store.dispatch('updateSelectedDay', new Date().getDate());
        this.$store.dispatch('updateSelectedDayTemp', new Date().getDate());
        this.$store.dispatch('updateSelectedDayReminder', new Date().getDate());
        this.$store.dispatch('updateSelectedMonth', new Date().getMonth());
        this.$store.dispatch('updateSelectedMonthTemp', new Date().getMonth());
        this.$store.dispatch('updateSelectedMonthReminder', new Date().getMonth());
        this.$store.dispatch('updateSelectedYear', new Date().getFullYear());
        this.$store.dispatch('updateSelectedYearTemp', new Date().getFullYear());
        this.$store.dispatch('updateSelectedYearReminder', new Date().getFullYear());
        this.$store.dispatch('updateSelectedPerson', "");
        this.$store.dispatch('updateSelectedPersonTemp', "");
        this.$store.dispatch('updateArchived', false);
        this.$store.dispatch('updateArchivedTemp', false);
        this.$store.dispatch('updatePosition', {lat:0, lng:0});
        this.$store.dispatch('updatePositionTemp', {lat:0, lng:0});
        this.$store.dispatch('updateCurrentPosition', {lat:0, lng:0});
        this.$store.dispatch('updatePicture', "");
        this.$store.dispatch('updatePictureTemp', "");
        this.$store.dispatch('updateTimeReminder', null);
        this.$store.dispatch('updateReminderSet', false);
      }
    }
  }
</script>