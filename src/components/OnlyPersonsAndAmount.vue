<template>
    <v-row class="mb-14">
      <v-col class="px-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group v-for="person in filterPersonsAgain()" v-bind:key="person.name" class="backgroundGrey">
              <v-list-item @click="showDebtsOfOnePerson(person)" style="background-color: #FFFFFF; border-bottom: 3px solid #EEEEEE">
                <v-list-item-icon class="mt-5">
                  <div v-if="!person.archiviert" class="circleSmall" v-bind:class="{ red: parseInt(getAmountOfPerson(person.name)) < 0 }"></div>
                  <v-icon v-if="person.archiviert">{{ checkIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ person.name }}</v-list-item-title>
                  <v-list-item-subtitle v-if="getAmountOfPerson(person.name) >= 0">schuldet mir {{ getAmountOfPerson(person.name).replace(".", ",") }},00 €</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="getAmountOfPerson(person.name) < 0">hat mir {{ getAmountOfPerson(person.name).replace(".", ",").substring(1) }},00 € geliehen</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon
                  class="ml-3 mt-1"
                  small
                  color="#BDBDBD"
                  >{{ greaterThanIcon }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
</template>

<script>
import personsDebtsMixin from "../mixins/personsDebtsMixin";
import { mdiGreaterThan } from '@mdi/js';
import { mdiCheck } from '@mdi/js';
export default {
  name: "OnlyPersonsAndAmount",
  data: () => ({
    greaterThanIcon: mdiGreaterThan,
    checkIcon: mdiCheck,
    transitionName: null
  }),
  mixins: [personsDebtsMixin],
  methods: {
    filterPersonsAgain() {
        let allDebtsIndexOfAllArchived = []
        let personsToReturn = this.filterPersons();
        for (let index = 0; index < personsToReturn.length; index++) {
            let found = this.debts.find(debt => debt.person === personsToReturn[index] && debt.archived === false);
            if (found) {
                if(!this.offen && this.archiviert) {
                    personsToReturn.splice(index, 1);
                    index--;
                } 
            } else allDebtsIndexOfAllArchived.push(index);
        }                    
        let personsArray = [];
        personsToReturn.forEach((person, index) => {
            let helperArchiviert = false;
            if(allDebtsIndexOfAllArchived.includes(index)) helperArchiviert = true;
            personsArray.push({
                name: person,
                archiviert: helperArchiviert
            })
        });    
        return personsArray;
    },
    showDebtsOfOnePerson(person) {
        this.$store.dispatch("updateSelectedPerson", person.name);
        this.$router.push('/debtsOfOnePerson')
    }
  }
};
</script>
