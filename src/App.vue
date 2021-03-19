<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
      absolute
      flat
    >
      <!-- Linke Seite -->
      <v-app-bar-nav-icon v-if="$route.path == '/'" color="light-blue lighten-2"></v-app-bar-nav-icon>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack === 'Zurück'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack !== 'Zurück'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/finishedDebt'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>Zurück</router-link>
      <router-link v-if="$route.path === '/time'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPerson }}</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="resetHeadingSelectPerson">Abbrechen</v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- Mitte -->
      <v-toolbar-title v-if="$route.path === '/'" class="app-title-font">still waitin</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/selectPerson'">{{ selectedPersonPageTitle }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/modifyDebt'" style="text-decoration: underline; text-decoration-color: #4FC3F7; color: white; cursor: pointer;" @click="updateHeadingSelectPerson">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/finishedDebt'">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/time'" style="color: white; cursor: pointer;">Datum</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Rechte Seite -->
      <router-link v-if="$route.path === '/'" class="routerLink" to="/selectPerson"><v-icon color="light-blue lighten-2">mdi-plus</v-icon></router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="save">Sichern</v-toolbar-items>
      <router-link v-if="$route.path === '/finishedDebt'" class="routerLink" to="/modifyDebt">Bearbeiten</router-link>
      <router-link v-if="$route.path === '/time'" class="routerLink" to="/modifyDebt">{{ timeCloseButton }}</router-link>
    </v-app-bar>

    <v-main style="background-color: #EEEEEE;">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import DebtsService from "@/services/DebtsService";
  import { mapState } from "vuex";
  export default {
    name: 'App',
    data: () => ({
      transitionName: null
    }),

    computed: {
      ...mapState(["debts", "selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedPersonPageBack", "selectedPersonPageTitle", "timeCloseButton", "selectedDay", "selectedMonth", "selectedYear"])
    },
    methods: {
      async save(){
        // Überprüfen, ob Neu oder Bearbeiten anhand der ID
        if(this.selectedDebtId) {
          // ID gesetzt -> Update der ID
          await DebtsService.updateDebt({
            id: this.selectedDebtId,
            person: this.selectedPerson,
            isPositive: this.isPositive===false ? false : true,
            amount: this.amount,
            description: this.description,
            date: new Date(this.selectedYear, this.selectedMonth, Number(this.selectedDay)+1).toISOString().substr(0, 10)
          });
        } else {
          // Keine ID gesetzt -> Neuer Debt
          await DebtsService.addDebt({
            person: this.selectedPerson,
            isPositive: this.isPositive===false ? false : true,
            amount: this.amount,
            description: this.description,
            date: new Date(this.selectedYear, this.selectedMonth, Number(this.selectedDay)+1).toISOString().substr(0, 10)
          });
        }
        this.$router.push('/');
      },
      updateHeadingSelectPerson() {
        this.$store.dispatch('updateSelectedPersonPageTitle', 'Bearbeiten');
        this.$store.dispatch('updateSelectedPersonPageBack', this.selectedPerson);
        this.$router.push('/selectPerson');
      },
      resetHeadingSelectPerson() {
        this.$store.dispatch('updateSelectedPersonPageTitle', 'Neu');
        this.$store.dispatch('updateSelectedPersonPageBack', "Zurück");
        this.$store.dispatch('updateSelectedPerson', "");
        this.$router.push('/');
      }
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

  .app-title-font {
    font-family: 'Righteous', cursive;
  }

  .routerLink {
    text-decoration: none; 
    color: #4FC3F7 !important;
  }

  .navigationWithFunction {
    text-decoration: none; 
    color: #4FC3F7; 
    cursor: pointer;
    margin-top: 32px;
  }

</style>
