<template>
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item dark style="background-color: #37474F; position: fixed; left: 0; bottom: 0; width: 100%;">
            <v-list-item-content>
              <v-list-item-title>Gesamt:</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon v-if="total >= 0">
              {{ total }},00 €
              <v-icon class="circleSmall ml-3"></v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="total < 0">
              {{ total.toString().substring(1) }},00 €
              <v-icon class="circleSmall ml-3 red"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex';
import getAmountOfPersonMixin from "../mixins/getAmountOfPersonMixin";
export default {
    name: "TotalAmount",
    mixins: [getAmountOfPersonMixin],
    computed: {
        ...mapState(["persons"]),
        total() {
            let initial = 0;
            return this.persons.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(this.getAmountOfPerson(currentValue));
                },initial)
            }
        }
}
</script>