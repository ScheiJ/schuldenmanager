<template>
  <div>
    <v-row>
        <v-col cols="1" class="mt-5 ml-3 mr-0 pb-0">
            <div v-if="!archived" class="circleBig" v-bind:class="{ green: isPositive, red: isPositive === false}"></div>
            <v-icon v-if="archived">{{ svgCheck }}</v-icon>
        </v-col>
        <v-col class="mt-4 ml-3 pb-0">
          <h1>{{ amount.replace(".", ",") }} €</h1>
        </v-col>
        <v-col class="mt-3 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4 pb-0">
            <v-text-field
            type="text"
            solo
            flat
            single-line
            filled
            readonly
            background-color="#EEEEEE"
            v-model="selectedDate"
            class="pl-1 backgroundGrey"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row style="height: 37vh;">
        <v-col cols="1" class="mr-0 pt-0">
        </v-col>
        <v-col class="ml-3 pt-0">
            <v-textarea
            v-model="description"
            id="textFieldDescription"
            label="Keine Beschreibung"
            background-color="#EEEEEE"
            solo
            flat
            readonly
            no-resize
            rows="7"
            ></v-textarea>
        </v-col>
        <v-col cols="1" class="ml-3 mr-0 pt-0">
        </v-col>
    </v-row>
    <v-row class="pb-0">
      <v-col>
        <GoogleMap />
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-list-item style="background-color: #37474F; position: fixed; bottom: 0; width: 100%">
            <v-list-item-icon>
              <v-icon color="#4FC3F7">{{ svgTrashCanOutline }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="overlay = !overlay">
                <v-list-item-title v-if="archived === false" style="color: #4FC3F7">Archivieren</v-list-item-title>
                <v-list-item-title v-if="archived === true" style="color: #4FC3F7">Löschen</v-list-item-title>
            </v-list-item-content>
            <v-overlay
            :absolute="absolute"
            :opacity="opacity"
            :value="overlay"
            >
              <v-row justify="space-around">
                  <v-col>
                      <v-card
                      class="d-flex align-center mx-auto"
                      height="40px"
                      style="border: 1px solid #4FC3F7"
                      @click="toggleArchive"
                      >
                      <v-card-text v-if="!archived" style="color: #4FC3F7" class="text-center">Archivieren</v-card-text>
                      <v-card-text v-if="archived" style="color: #4FC3F7; line-height: 1.2;" class="text-center">Als offen markieren</v-card-text>
                      </v-card>
                  </v-col>
                  <v-col>
                      <v-card
                      class="d-flex align-center mx-auto"
                      height="40px"
                      style="border: 1px solid #4FC3F7"
                      @click="deleteThisDebt"
                      >
                      <v-card-text style="color: #4FC3F7" class="text-center">Löschen</v-card-text>
                      </v-card>
                  </v-col>
                  <v-col>
                      <v-icon @click="overlay = false" class="mt-2" color="light-blue lighten-2">{{ svgClose }}</v-icon>
                  </v-col>
              </v-row>
            </v-overlay>
          </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiCheck, mdiTrashCanOutline, mdiClose } from '@mdi/js';
import { toggleArchiveDebt, deleteDebt } from "@/services/DebtsService";
import { mapState } from "vuex";
import modifyLocalDebtsMixin from "../mixins/modifyLocalDebtsMixin";
import getFullDateMixin from "../mixins/getFullDateMixin";
export default {
  name: 'FinishedDebt',
  data () {
    return {
      svgCheck: mdiCheck,
      svgTrashCanOutline: mdiTrashCanOutline,
      svgClose: mdiClose,
      absolute: true,
      opacity: 1,
      overlay: false,
    }
  },
  mixins: [modifyLocalDebtsMixin, getFullDateMixin],
  computed: {
    ...mapState(["debts", "selectedDebtId", "isPositive", "amount", "description", "archived", "position"])
  },
  components: {
    GoogleMap: () => import('@/components/GoogleMap.vue'),
  },
  methods: {
      async toggleArchive() {
          await toggleArchiveDebt({
            id: this.selectedDebtId,
          }); 
          let indexToToggleArchived = this.findIndexInLocalArray(this.debts, this.selectedDebtId);
          this.$store.dispatch("toggleArchivedInDebts", indexToToggleArchived);
          this.$router.push("/");
      },
      async deleteThisDebt() {
          await deleteDebt(this.selectedDebtId);  
          let indexToDelete = this.findIndexInLocalArray(this.debts, this.selectedDebtId);
          this.$store.dispatch("deleteDebt", indexToDelete);
          this.$router.push("/");
      }
  }
}
</script>

<style scoped>
    .centered-input >>> input {
        text-align: center !important;
    }
</style>>
