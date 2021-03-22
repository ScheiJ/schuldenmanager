<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
      absolute
      flat
      style="position: fixed"
    >
      <!-- Linke Seite -->
      <router-link class="routerLink" to="/settings"><v-app-bar-nav-icon v-if="$route.path === '/'" color="light-blue lighten-2"></v-app-bar-nav-icon></router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack === 'Zurück'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack !== 'Zurück'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>Zurück</router-link>
      <router-link v-if="$route.path === '/time'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPerson }}</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="resetHeadingSelectPerson">Abbrechen</v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- Mitte -->
      <v-toolbar-title v-if="$route.path === '/'" class="app-title-font">still waitin</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/settings'">Einstellungen</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/selectPerson'">{{ selectedPersonPageTitle }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/modifyDebt'" style="text-decoration: underline; text-decoration-color: #4FC3F7; color: white; cursor: pointer;" @click="updateHeadingSelectPerson">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/time'" style="color: white; cursor: pointer;">Datum</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Rechte Seite -->
      <router-link v-if="$route.path === '/'" class="routerLink" to="/selectPerson"><v-icon color="light-blue lighten-2">mdi-plus</v-icon></router-link>
      <router-link v-if="$route.path === '/debtsOfOnePerson'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">mdi-plus</v-icon></router-link>
      <router-link v-if="$route.path === '/settings'" class="routerLink" to="/">Fertig</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="save">Sichern</v-toolbar-items>
      <router-link v-if="$route.path === '/finishedDebt'" class="routerLink" to="/modifyDebt">Bearbeiten</router-link>
      <router-link v-if="$route.path === '/time'" class="routerLink" to="/modifyDebt">{{ timeCloseButton }}</router-link>
    </v-app-bar>

    <v-main class="backgroundGrey">
      <v-container fluid>
        <transition :name="transitionName" mode="out-in">
          <router-view />
        </transition>
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
    watch: {
      '$route' (to, from) {
        if (from.path === '/') {
          if (to.path === '/settings') this.transitionName = 'slide-right';
          else this.transitionName = 'slide-left';
        } else if (from.path === '/settings') this.transitionName = 'slide-left';
        else if (from.path === '/selectPerson') {
          if (to.path === '/' || (to.path === '/modifyDebt' && this.selectedPersonPageTitle === 'Bearbeiten')) this.transitionName = 'slide-right';
          else if (to.path === '/modifyDebt') this.transitionName = 'slide-left';
        } else if (from.path === '/modifyDebt') {
          if (to.path === '/selectPerson' || to.path === '/time') this.transitionName = 'slide-left';
          else if (to.path === '/') this.transitionName = 'slide-right';
          else if (to.path === '/finishedDebt') this.transitionName = null;
        } else if (from.path === '/time') this.transitionName = 'slide-right';
        else if (from.path === '/finishedDebt') {
          if (to.path === '/') this.transitionName = 'slide-right';
          else if (to.path === '/modifyDebt') this.transitionName = null;
        } else if (from.path === '/debtsOfOnePerson') {
          if (to.path === '/') this.transitionName = 'slide-right';
        }
      }
    },
    // beforeMount() {
    //   window.addEventListener("beforeunload", event => {
    //     event.preventDefault()
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = ""
    //   })
    // },
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
        this.selectedDebtId === 0 ? this.$router.push('/') : this.$router.push('/finishedDebt');
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

  /*slide transition*/

  .slide-left-leave-active,
  .slide-right-leave-active
  {
    transition: transform 0.3s ease-out;
  }
  .slide-left-enter,
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  .slide-left-leave-to,
  .slide-right-enter {
    transform: translateX(-100%);
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
