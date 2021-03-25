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
          @keyup.enter="selectPerson"
          @keyup="filter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group>
            <v-list-item @click="setAndSelectPerson(person)" v-for="person in personsToShow" v-bind:key="person" style="border-bottom: 0.5px solid black; background-color: #FFFFFF">
              <v-list-item-content>
                <v-list-item-title>{{ person }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon 
                small
                color="#BDBDBD"
                >{{ greaterThanIcon }}</v-icon>
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
  import { mdiGreaterThan } from '@mdi/js';
  export default {
    name: 'SelectPerson',

    components: {
      //HelloWorld,
    },
    data: () => {
      return {
        greaterThanIcon: mdiGreaterThan,
        person: "",
        personsToShow: []
      }
    },
    mounted: function () {
      this.person = this.selectedPerson;
      this.filter();
    },
    computed: {
      ...mapState(["persons", "selectedPerson"])
    },
    methods: {
      filter() {
        this.personsToShow = this.persons.filter(person => {
          return person.includes(this.person);
        })
      },
      async selectPerson() {
        if(this.person) {
          if(this.selectedPerson !== this.person) this.$store.dispatch("updateSelectedPerson", this.person);
          this.$router.push('modifyDebt');
        }
      },
      setAndSelectPerson(name) {
        this.person = name;
        this.selectPerson();
      }
    }
  }
</script>
