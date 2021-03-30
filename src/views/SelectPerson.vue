<template>
  <div>
    <v-row>
      <v-col class="pa-0">
        <v-divider dark></v-divider>
        <v-text-field
          v-model="person"
          placeholder="Person"
          dark
          dense
          solo
          flat
          background-color="blue-grey darken-3"
          class="mt-0 pt-5"
          style="background-color: #37474F;"
          @keyup.enter="selectPerson(person)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group>
            <v-list-item @click="selectPerson(person)" v-for="person in filterPersons" v-bind:key="person" style="border-bottom: 0.5px solid black; background-color: #FFFFFF">
              <v-list-item-content>
                <v-list-item-title>{{ person }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon 
                small
                color="#BDBDBD"
                >{{ svgGreaterThan }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mdiGreaterThan } from '@mdi/js';
  import { mapState } from "vuex";
  export default {
    name: 'SelectPerson',
    data: () => {
      return {
        svgGreaterThan: mdiGreaterThan,
        person: "",
        personsToShow: []
      }
    },
    mounted: function () {
      this.person = this.selectedPerson;
    },
    computed: {
      ...mapState(["persons", "selectedPerson"]),
      filterPersons: function() {
        return this.persons.filter(person => {
          return person.includes(this.person);
        })
      }
    },
    methods: {
      async selectPerson(person) {
        if(person) {
          if(this.selectedPerson !== person) this.$store.dispatch("updateSelectedPerson", person);
          this.$router.push('/modifyDebt');
        }
      },
    }
  }
</script>
