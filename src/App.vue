<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
      absolute
      flat
      style="position: fixed; height:8vh"
    >
      <!-- Linke Seite -->
      <router-link class="routerLink" to="/settings"><v-icon v-if="$route.path === '/'" color="light-blue lighten-2">{{ svgMenu }}</v-icon></router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack === 'Zurück'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack !== 'Zurück'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>Zurück</router-link>
      <router-link v-if="$route.path === '/date' || $route.path === '/geolocation'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPerson }}</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="resetHeadingSelectPerson">Abbrechen</v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- Mitte -->
      <v-toolbar-title v-if="$route.path === '/'" class="app-title-font">still waitin</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/settings'">Einstellungen</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/selectPerson'">{{ selectedPersonPageTitle }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/modifyDebt'" style="text-decoration: underline; text-decoration-color: #4FC3F7; color: white; cursor: pointer;" @click="updateHeadingSelectPerson">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/date'" style="color: white; cursor: pointer;">Datum</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Rechte Seite -->
      <router-link v-if="$route.path === '/'" class="routerLink" to="/selectPerson"><v-icon color="light-blue lighten-2">{{ svgPlus }}</v-icon></router-link>
      <router-link v-if="$route.path === '/debtsOfOnePerson'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgPlus }}</v-icon></router-link>
      <router-link v-if="$route.path === '/settings'" class="routerLink" to="/">Fertig</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="save">Sichern</v-toolbar-items>
      <router-link v-if="$route.path === '/finishedDebt'" class="routerLink" to="/modifyDebt">Bearbeiten</router-link>
      <router-link v-if="$route.path === '/date'" class="routerLink" to="/modifyDebt">{{ dateCloseButton }}</router-link>
      <v-toolbar-items v-if="$route.path === '/geolocation'" style="cursor: pointer" @click="saveLocation"><v-icon color="light-blue lighten-2">{{ svgMapMarkerRadius }}</v-icon></v-toolbar-items>
    </v-app-bar>

    <v-main class="backgroundGrey">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mdiLessThan, mdiPlus, mdiMenu, mdiMapMarkerRadius } from '@mdi/js';
  import { fetchAllDebts, addDebt, updateDebt } from "@/services/DebtsService";
  import { fetchSettings } from "@/services/SettingsService";
  import { mapState } from "vuex";
  export default {
    name: 'App',
    data: () => ({
      svgLessThan: mdiLessThan,
      svgPlus: mdiPlus,
      svgMenu: mdiMenu,
      svgMapMarkerRadius: mdiMapMarkerRadius,
      transitionName: null
    }),

    computed: {
      ...mapState(["debts", "selectedPerson", "selectedDebt", "selectedDebtId", "isPositive", "amount", "description", "archived", "selectedPersonPageBack", "selectedPersonPageTitle", "dateCloseButton", "selectedDay", "selectedMonth", "selectedYear", "currentPosition", "position", "settings"])
    },
    created() {
      if (this.$workbox) {
        this.$workbox.addEventListener("waiting", () => {
          this.showUpdateUI = true;
        });
      }
      this.fetchDebts();
      this.getSettings();
    },
    methods: {
      async accept() {
        this.showUpdateUI = false;
        await this.$workbox.messageSW({ type: "SKIP_WAITING" });
      },
      async fetchDebts() {
        let debts = await fetchAllDebts();
        debts = debts.data.debts;
        this.$store.commit("updateDebts", debts);
        this.checkForNewPersons();
      },
      checkForNewPersons() {
        let persons = [];
        this.debts.forEach(debt => {
          if(!persons.includes(debt.person)) {
            persons.push(debt.person)
          }
        })
        this.$store.dispatch("updatePersons", persons);
      },
      async getSettings() {
        let settings = await fetchSettings();
        settings = settings.data.settings;
        this.$store.dispatch('updateSettings', settings);
      },
      async save(){
        let newDebt = {
          _id: this.getRandomString(24),
          person: this.selectedPerson,
          isPositive: this.isPositive===false ? false : true,
          amount: this.amount,
          description: this.description,
          archived: false,
          date: new Date(this.selectedYear, this.selectedMonth, Number(this.selectedDay)+1).toISOString().substr(0, 10),
          position: this.position
        }
        let currentDebts = this.debts;
        // Überprüfen, ob Neu oder Bearbeiten anhand der ID
        if(this.selectedDebtId) {
          // ID gesetzt -> Update der ID
          newDebt._id = this.selectedDebtId;
          newDebt.archived = this.archived;
          await updateDebt(newDebt)
          let indexToDelete = this.debts.findIndex(debt => {
            return debt._id === this.selectedDebtId;
          });
          currentDebts.splice(indexToDelete, 1);
        } else {
          // Keine ID gesetzt -> Neuer Debt
          await addDebt(newDebt)
        }
        newDebt.amount = {
          $numberDecimal: newDebt.amount
        }
        currentDebts.push(newDebt);
        this.$store.commit("updateDebts", currentDebts);
        await this.checkForNewPersons();
        this.selectedDebtId === 0 ? this.$router.push('/') : this.$router.push('/finishedDebt');
      },
      saveLocation() {
        this.$store.dispatch("updatePosition", this.currentPosition);
      },
      getRandomString(length) {
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let randS = "";

        while(length > 0) {
            randS += chars.charAt(Math.floor(Math.random() * chars.length));
            length--;
        }
        return randS;
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
        this.selectedDebtId === 0 ? this.$router.push('/') : this.$router.push('/finishedDebt');
      }
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
  #app {
    font-family: 'Roboto', sans-serif;
  }

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

  /* Global Styles */

  .backgroundWhite {
    background-color: #FFFFFF;
  }

  .backgroundGrey {
    background-color: #EEEEEE;
  }

  .circleBig {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #8BC34A;
    border: 5px solid #8BC34A;
    margin: auto;
  } 

  .circleSmall {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #8BC34A;
    border: 5px solid #8BC34A;
    margin: auto;
  }

  .red {
    background: #C62828; border-color: #C62828;
  } 

  .green {
    background: #8BC34A; border-color: #8BC34A;
  }

  .blue {
    color: #4FC3F7
  }
</style>
