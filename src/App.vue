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
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack === 'Zurück'" style="text-decoration: none; color: #4FC3F7" to="/"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/selectPerson' && selectedPersonPageBack !== 'Zurück'" style="text-decoration: none; color: #4FC3F7" to="/newDebt"><v-icon color="light-blue lighten-2">mdi-less-than</v-icon>{{ selectedPersonPageBack }}</router-link>
      <router-link v-if="$route.path === '/newDebt'" style="text-decoration: none; color: #4FC3F7" to="/">Abbrechen</router-link>

      <v-spacer></v-spacer>

      <!-- Mitte -->
      <v-toolbar-title v-if="$route.path === '/'" class="app-title-font">still waitin</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/selectPerson'">{{ selectedPersonPageTitle }}</v-toolbar-title>
      <v-toolbar-title v-if="$route.path === '/newDebt'" style="text-decoration: underline; text-decoration-color: #4FC3F7; color: white; cursor: pointer;" @click="updateHeadingSelectPerson">{{ selectedPerson }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Rechte Seite -->
      <router-link v-if="$route.path === '/'" style="text-decoration: none;" to="/selectPerson"><v-icon color="light-blue lighten-2">mdi-plus</v-icon></router-link>
      <router-link v-if="$route.path === '/newDebt'" style="text-decoration: none; color: #4FC3F7" to="/">Sichern</router-link>
    </v-app-bar>

    <v-main style="background-color: #EEEEEE;">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: 'App',

    data: () => ({
      
    }),
    computed: {
      ...mapState(["selectedPerson", "selectedPersonPageBack", "selectedPersonPageTitle"])
    },
    methods: {
      updateHeadingSelectPerson() {
        this.$store.dispatch('updateSelectedPersonPageTitle', 'Bearbeiten');
        this.$store.dispatch('updateSelectedPersonPageBack', this.selectedPerson);
        this.$router.push('/selectPerson');
      }
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

  .app-title-font {
    font-family: 'Righteous', cursive;
  }

</style>
