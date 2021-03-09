<template>
  <v-row>
    <v-col class="pa-0">
      <v-divider dark></v-divider>
      <v-text-field
        v-model="person"
        placeholder="Person"
        autofocus
        dark
        dense
        solo
        flat
        background-color="blue-grey darken-3"
        class="mt-0 pt-5"
        style="background-color: #37474F;"
        @keyup.enter="selectPerson"
      ></v-text-field>
      <p @click="selectPerson">test</p>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: 'SelectPerson',

    components: {
      //HelloWorld,
    },
    data: () => {
      return {
        person: "",
      }
    },
    mounted: function () {
      this.person = this.selectedPerson;
    },
    computed: {
      ...mapState(["selectedPerson"])
    },
    methods: {
      selectPerson() {
        if(this.person) {
          if(this.selectedPerson !== this.person) this.$store.dispatch("updateSelectedPerson", this.person);
          this.$router.push('newDebt');
        }
      }
    }
  }
</script>
