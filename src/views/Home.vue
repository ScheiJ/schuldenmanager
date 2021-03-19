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
    <v-item-group mandatory class="mb-3 px-2" v-model="selectedDebts">
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
    <v-row class="mb-14">
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group v-for="person in filterPersons()" v-bind:key="person" style="background-color: #EEEEEE">
            <v-subheader v-if="getAmountOfPerson(person) >= 0" class="pt-10 pb-4"><strong class="mr-2">{{ person }}</strong>schuldet mir {{ getAmountOfPerson(person).replace(".", ",") }},00 €</v-subheader>
            <v-subheader v-if="getAmountOfPerson(person) < 0" class="pt-10 pb-4"><strong class="mr-2">{{ person }}</strong>hat mir {{ getAmountOfPerson(person).replace(".", ",").substring(1) }},00 € geliehen</v-subheader>
              <v-list-item v-for="debt in filterDebts(person)" :key="debt._id" @click="showFinishedDebt(debt)" style="background-color: #FFFFFF; border-bottom: 3px solid #EEEEEE">
                <v-list-item-icon v-if="!debt.archived" v-bind:class="{ 'mt-5': debt.description !== '' }">
                  <div  class="circle" v-bind:class="{ red: debt.isPositive === false }"></div>
                </v-list-item-icon>
                <v-list-item-icon v-if="debt.archived" v-bind:class="{ 'mt-5': debt.description !== '' }">
                  <v-icon>mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ getNormalFormat(debt.date) }}</v-list-item-subtitle>
                  <v-list-item-title>{{ debt.description }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  {{ debt.amount.$numberDecimal.replace(".", ",") }} €
                  <v-icon
                  class="ml-3"
                  small
                  color="#BDBDBD"
                  >mdi-greater-than</v-icon>
                </v-list-item-icon>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item dark style="background-color: #37474F; position: fixed; left: 0; bottom: 0; width: 100%;">
            <v-list-item-content>
              <v-list-item-title>Gesamt:</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon v-if="total >= 0">
              {{ total }},00 €
              <v-icon class="circle ml-3"></v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="total < 0">
              {{ total.toString().substring(1) }},00 €
              <v-icon class="circle ml-3" v-bind:class="{ red: total < 0 }"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import DebtsService from "@/services/DebtsService";
  export default {
    name: 'Home',
    components: {
      
    },
    data: () => ({
      searchInput: "",
      selectedDebts: 0,
    }),
    computed: {
      ...mapState(["persons", "debts", "selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived"]),
      total: function () {
        let initial = 0;
        return this.persons.reduce((accumulator, currentValue) => {
          let arrayCurrentValue = this.filterDebts(currentValue)
          let ini = 0;
          let amountCurrentValue = arrayCurrentValue.reduce((acc, current) => {
            return acc + parseInt(current.amount.$numberDecimal);
          }, ini)
          return accumulator + amountCurrentValue;
        },initial)
      },
      offen: function() {
        return this.selectedDebts === 0 || this.selectedDebts === 2;
      },
      archiviert: function() {
        return this.selectedDebts === 1 || this.selectedDebts === 2;
      }
    },
    mounted: function() {
      this.fetchAllDebts();
      this.resetStates();
    },
    methods: {
      async fetchAllDebts() {
        let debts = await DebtsService.fetchAllDebts();
        debts = debts.data.debts;
        this.$store.dispatch("updateDebts", debts);
        let persons = [];
        debts.forEach(debt => {
          if(!persons.includes(debt.person)) {
            persons.push(debt.person)
          }
        })
        this.$store.dispatch("updatePersons", persons);
      },
      resetStates() {
        this.$store.dispatch('updateSelectedDebtId', 0);
        this.$store.dispatch('updateIsPositive', null);
        this.$store.dispatch('updateAmount', "0.00");
        this.$store.dispatch('updateDescription', "");
        this.$store.dispatch('updateSelectedDay', new Date().getDate());
        this.$store.dispatch('updateSelectedMonth', new Date().getMonth());
        this.$store.dispatch('updateSelectedYear', new Date().getFullYear());
        this.$store.dispatch('updateSelectedPerson', "");
        this.$store.dispatch('updateArchived', false);
      },
      getNormalFormat(date){
        let newDate = new Date(date)
        let year = newDate.getFullYear();
        let month = newDate.getMonth()+1;
        if (month.toString().length === 1) month = "0" + month;
        let day = newDate.getDate();
        if (day.toString().length === 1) day = "0" + day; 
        return day + "." + month + "." +  year;
      },
      filterPersons() {
        let personsToReturn = [];
        this.debts.forEach(debt => {
          if((this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && !personsToReturn.includes(debt.person) && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived))) {
            personsToReturn.push(debt.person)
          }
        })
        return personsToReturn
      },
      partOfSearch(word) {
        if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
        else return false;
      },
      filterDebts(person) {
        let debtsToReturn = [];
        debtsToReturn = this.debts.filter(debt => {
          if((this.partOfSearch(debt.description) || this.partOfSearch(debt.person)) && debt.person === person && ((this.offen && this.archiviert) || (this.offen && !debt.archived) || (this.archiviert && debt.archived))) {
            return debt
          }
        })
        return debtsToReturn;
       },
      getAmountOfPerson(person) {
        let initial = 0
        let result = this.debts.reduce((accumulator, currentValue) => {
          if(currentValue.person === person) {
            if(!currentValue.isPositive) return accumulator - parseInt(currentValue.amount.$numberDecimal);
            return accumulator + parseInt(currentValue.amount.$numberDecimal);
          } else return accumulator
        }, initial)
        return result.toString();
      },
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
        this.$router.push('finishedDebt');
      }
    }
  }
</script>

<style scoped>
.circle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #8BC34A;
    border: 5px solid #8BC34A;
    margin: auto;
} 
.red {
  background-color: #C62828;
}
</style>
