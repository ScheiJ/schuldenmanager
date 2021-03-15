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
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group v-for="person in filterPersons(persons)" v-bind:key="person._id" style="background-color: #EEEEEE">
            <v-subheader v-if="person.amount.$numberDecimal > 0" class="pt-10 pb-4"><strong class="mr-2">{{ person.name }}</strong>schuldet mir {{ person.amount.$numberDecimal.replace(".", ",") }} €</v-subheader>
            <v-subheader v-if="person.amount.$numberDecimal == 0" class="pt-10 pb-4"><strong class="mr-2">{{ person.name }}</strong>schuldet mir {{ person.amount.$numberDecimal.replace(".", ",") }},00 €</v-subheader>
            <v-subheader v-if="person.amount.$numberDecimal < 0" class="pt-10 pb-4"><strong class="mr-2">{{ person.name }}</strong>hat mir {{ person.amount.$numberDecimal.replace(".", ",").substring(1) }},00 € geliehen</v-subheader>
              <v-list-item v-for="debt in filterDebts(person)" :key="debt._id" style="background-color: #FFFFFF; border-bottom: 3px solid #EEEEEE">
                <v-list-item-icon v-bind:class="{ 'mt-5': debt.description !== '' }">
                  <div class="circle" v-bind:class="{ red: debt.isGreen === false }"></div>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ getNormalFormat(debt.date) }}</v-list-item-subtitle>
                  <v-list-item-title>{{ debt.description }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  {{ debt.amount.$numberDecimal }} €
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
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import PersonsService from "@/services/PersonsService";
  export default {
    name: 'Home',
    components: {
      
    },
    data: () => ({
      searchInput: "",
      selectedDebts: 0,
      debtsToShow: []
    }),
    computed: {
      ...mapState(["persons"])
    },
    mounted: function() {
      this.fetchAllPersons();
    },
    methods: {
      async fetchAllPersons() {
        let persons = await PersonsService.fetchAllPersons();
        this.$store.dispatch("updatePersons", persons.data.persons);
      },
      getNormalFormat(date){
        let newDate = new Date(date)
        let year = newDate.getFullYear();
        let month = newDate.getMonth();
        if (month.toString().length === 1) month = "0" + month;
        let day = newDate.getDate();
        if (day.toString().length === 1) day = "0" + day; 
        return day + "." + month + "." +  year;
      },
      filterPersons(persons) {
        let offen = this.selectedDebts === 0 || this.selectedDebts === 2;
        let archiviert = this.selectedDebts === 1 || this.selectedDebts === 2;
        let personsToReturn = [];
        persons.forEach(person => {
          let personNamePartOfSearch = this.partOfSearch(person.name)
          if(offen && archiviert) {
            if(person.openDebts.length !== 0 || person.archivedDebts.length !== 0) {
              if(person.openDebts.length !== 0) {
                for(let i = 0; i<person.openDebts.length; i++){
                  if(this.partOfSearch(person.openDebts[i].description) || personNamePartOfSearch) {
                    personsToReturn.push(person); 
                    break;
                  }
                }
              } else if(person.archivedDebts.length !== 0) {
                for(let i = 0; i<person.archivedDebts.length; i++){
                  if(this.partOfSearch(person.archivedDebts[i].description) || personNamePartOfSearch) {
                    personsToReturn.push(person); 
                    break;
                  }
                }
              }
            }
          } else if(offen) {
            if(person.openDebts.length !== 0) {
              for(let i = 0; i<person.openDebts.length; i++){
                if(this.partOfSearch(person.openDebts[i].description) || personNamePartOfSearch) {
                  personsToReturn.push(person); 
                  break;
                }
              }
            }
          } else if(archiviert) {
            if(person.archivedDebts.length !== 0) {
              for(let i = 0; i<person.archivedDebts.length; i++){
                if(this.partOfSearch(person.archivedDebts[i].description) || personNamePartOfSearch) {
                  personsToReturn.push(person); 
                  break;
                }
              }
            }
          }
        })
        return personsToReturn
      },
      partOfSearch(word) {
        if (word.toLowerCase().includes(this.searchInput.toLowerCase())) return true;
        else return false;
      },
      filterDebts(person) {
        let offen = this.selectedDebts === 0 || this.selectedDebts === 2;
        let archiviert = this.selectedDebts === 1 || this.selectedDebts === 2;
        let debtsToReturn = []
        if(offen && archiviert) {
          debtsToReturn.push(person.openDebts)
          debtsToReturn.push(person.archivedDebts)
        } else if(offen) {
          debtsToReturn.push(person.openDebts)
        } else if(archiviert) {
          debtsToReturn.push(person.archivedDebts)
        }
        return debtsToReturn[0];
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
