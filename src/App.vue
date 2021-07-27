<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
      absolute
      flat
      style="position: fixed; height:70px;"
    >
      <!-- Left Side -->
      <router-link class="routerLink" to="/settings"><v-icon v-if="$route.path === '/'" color="light-blue lighten-2">{{ svgMenu }}</v-icon></router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack === 'Zurück'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack !== 'Zurück'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'" class="routerLink" to="/"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>Zurück</router-link>
      <router-link v-if="$route.path === '/date' || $route.path === '/geolocation'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon>{{ selectedPersonTemp }}</router-link>
      <v-toolbar-items v-if="$route.path === '/reminder'" class="reminderBack" @click="setReminder"><v-icon color="light-blue lighten-2">{{ svgLessThan }}</v-icon><p class="pt-4">{{ selectedPerson }}</p></v-toolbar-items>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="resetHeadingSelectPerson">Abbrechen</v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- Middle -->
      <v-toolbar-title v-if="$route.path === '/'" class="app-title-font">still waitin</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/settings'">Einstellungen</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/selectPerson'">{{ selectedPersonPageTitle }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/modifyDebt'" style="text-decoration: underline; text-decoration-color: #4FC3F7; color: white; cursor: pointer;" @click="updateHeadingSelectPerson">{{ selectedPersonTemp }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/finishedDebt' || $route.path === '/debtsOfOnePerson'">{{ selectedPerson }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/date'" style="color: white; cursor: pointer;">Datum</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/reminder'" style="color: white; cursor: pointer;">Erinnerung am...</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Right Side -->
      <router-link v-if="$route.path === '/'" class="routerLink" to="/selectPerson"><v-icon color="light-blue lighten-2">{{ svgPlus }}</v-icon></router-link>
      <router-link v-if="$route.path === '/debtsOfOnePerson'" class="routerLink" to="/modifyDebt"><v-icon color="light-blue lighten-2">{{ svgPlus }}</v-icon></router-link>
      <router-link v-if="$route.path === '/settings'" class="routerLink" to="/">Fertig</router-link>
      <v-toolbar-items v-if="$route.path === '/modifyDebt'" class="navigationWithFunction" @click="save">Sichern</v-toolbar-items>
      <v-toolbar-items v-if="$route.path === '/finishedDebt'" class="navigationWithFunction" @click="modifyDebt">Bearbeiten</v-toolbar-items>
      <router-link v-if="$route.path === '/date'" class="routerLink" to="/modifyDebt">{{ dateCloseButton }}</router-link>
      <v-toolbar-items v-if="$route.path === '/reminder'" class="navigationWithFunction" @click="setReminder">{{ dateCloseButton }}</v-toolbar-items>
      <v-toolbar-items v-if="$route.path === '/geolocation'" class="pt-3" style="cursor: pointer" @click="saveLocation"><v-icon color="light-blue lighten-2">{{ svgMapMarkerRadius }}</v-icon></v-toolbar-items>
    </v-app-bar>

    <v-main class="backgroundGrey mt-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mdiLessThan, mdiPlus, mdiMenu, mdiMapMarkerRadius } from '@mdi/js';
  import { fetchAllDebts, addDebt, updateDebt, addImage, setReminder } from "@/services/DebtsService";
  import { fetchSettings } from "@/services/SettingsService";
  import modifyLocalDebtsMixin from "./mixins/modifyLocalDebtsMixin";
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
    mixins: [modifyLocalDebtsMixin],
    computed: {
      ...mapState(["debts", "selectedPerson", "selectedPersonTemp", "selectedDebt", "selectedDebtId", "isPositive", "isPositiveTemp", "amount", "amountTemp", "description", "descriptionTemp", "archived", "archivedTemp", "selectedPersonPageBack", "selectedPersonPageTitle", "dateCloseButton", "selectedDay", "selectedDayTemp", "selectedMonth", "selectedMonthTemp", "selectedYear", "selectedYearTemp", "position", "positionTemp", "currentPosition", "picture", "pictureTemp", "settings", "selectedDayReminder", "selectedMonthReminder", "selectedYearReminder", "timeReminder"])
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
      // Method to skip sw in settings
      async accept() {
        this.showUpdateUI = false;
        await this.$workbox.messageSW({ type: "SKIP_WAITING" });
      },
      // fetch all debts
      async fetchDebts() {
        let debts = await fetchAllDebts();
        debts = debts.data.debts;
        this.$store.dispatch("updateDebts", debts);
        this.checkForNewPersons();
      },
      //check if there was a new person
      checkForNewPersons() {
        let persons = [];
        this.debts.forEach(debt => {
          if(!persons.includes(debt.person)) {
            persons.push(debt.person)
          }
        })
        this.$store.dispatch("updatePersons", persons);
      },
      //fetch settings
      async getSettings() {
        let settings = await fetchSettings();
        settings = settings.data.settings;
        this.$store.dispatch('updateSettings', settings);
      },
      //save debt
      async save(){
        let newDebt = {
          _id: this.getRandomString(24),
          person: this.selectedPersonTemp,
          isPositive: this.isPositiveTemp===false ? false : true,
          amount: this.amountTemp,
          description: this.descriptionTemp,
          archived: false,
          date: new Date(this.selectedYearTemp, this.selectedMonthTemp, Number(this.selectedDayTemp)+1).toISOString().substr(0, 10),
          position: this.positionTemp,
          picture: "",
          reminder: ""
        }
        if(this.pictureTemp) {
          if(typeof this.pictureTemp !== 'string') {
            if(!navigator.onLine) {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                localStorage.setItem(this.pictureTemp.get('image').name, reader.result);
              })
              reader.readAsDataURL(this.pictureTemp.get('image'));
            }
            await addImage(this.pictureTemp);
            let image = this.pictureTemp.get('image');
            let imageName = image.name
            newDebt.picture = imageName;
            this.$store.dispatch("updatePicture", imageName);
          } else newDebt.picture = this.pictureTemp;
        }
        let currentDebts = this.debts;
        // Check if new or edit
        if(this.selectedDebtId) {
          // id available -> update debt
          newDebt._id = this.selectedDebtId;
          newDebt.archived = this.archivedTemp;
          await updateDebt(newDebt)
          let indexToDelete = this.debts.findIndex(debt => {
            return debt._id === this.selectedDebtId;
          });
          currentDebts.splice(indexToDelete, 1);
          this.setFinishedVars();
        } else {
          // no id available -> new debt
          await addDebt(newDebt);
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
        this.$store.dispatch("updatePositionTemp", this.currentPosition);
      },
      setFinishedVars() {
        this.$store.dispatch('updateSelectedPerson', this.selectedPersonTemp);
        this.$store.dispatch('updateIsPositive', this.isPositiveTemp);
        this.$store.dispatch('updateAmount', this.amountTemp);
        this.$store.dispatch('updateDescription', this.descriptionTemp);
        this.$store.dispatch('updateSelectedDay', this.selectedDayTemp);
        this.$store.dispatch('updateSelectedMonth', this.selectedMonthTemp);
        this.$store.dispatch('updateSelectedYear', this.selectedYearTemp);
        this.$store.dispatch('updateArchived', this.archivedTemp);
        this.$store.dispatch('updatePosition', this.positionTemp);
        if(typeof this.pictureTemp === 'string') this.$store.dispatch('updatePicture', this.pictureTemp);
      },
      //get random string from chars as mongo id
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
        this.$store.dispatch('updateSelectedPersonPageBack', this.selectedPersonTemp);
        this.$router.push('/selectPerson');
      },
      resetHeadingSelectPerson() {
        this.$store.dispatch('updateSelectedPersonPageTitle', 'Neu');
        this.$store.dispatch('updateSelectedPersonPageBack', "Zurück");
        this.$store.dispatch('updateSelectedPersonTemp', "");
        this.selectedDebtId === 0 ? this.$router.push('/') : this.$router.push('/finishedDebt');
      },
      modifyDebt() {
        this.$store.dispatch("updateSelectedPersonTemp", this.selectedPerson);
        this.$store.dispatch("updateIsPositiveTemp", this.isPositive);
        this.$store.dispatch("updateAmountTemp", this.amount);
        this.$store.dispatch("updateDescriptionTemp", this.description);
        this.$store.dispatch('updateSelectedDayTemp', this.selectedDay);
        this.$store.dispatch('updateSelectedMonthTemp', this.selectedMonth);
        this.$store.dispatch('updateSelectedYearTemp', this.selectedYear);
        this.$store.dispatch('updateArchivedTemp', this.archived);
        this.$store.dispatch('updatePositionTemp', this.position);
        this.$store.dispatch('updatePictureTemp', this.picture)
        this.$router.push('/modifyDebt');
      },
      async setReminder() {
        if(this.dateCloseButton === 'Fertig') {
          let reminder = new Date(this.selectedYearReminder, this.selectedMonthReminder, this.selectedDayReminder, this.timeReminder.substring(0,2), this.timeReminder.substring(3,5));
          await setReminder({
            id: this.selectedDebtId,
            reminder: reminder
          });
          let debtToChangeReminder = this.findIndexInLocalArray(this.debts, this.selectedDebtId);
          this.$store.dispatch("setTimeReminder", [debtToChangeReminder, reminder.toISOString()]);
        }
        this.$router.push('/finishedDebt');
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
    margin-top: 5px;
  }

  .navigationWithFunction {
    text-decoration: none; 
    color: #4FC3F7; 
    cursor: pointer;
    margin-top: 45px;
  }

  .reminderBack {
    text-decoration: none; 
    color: #4FC3F7; 
    cursor: pointer;
    margin-top: 5px;
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
