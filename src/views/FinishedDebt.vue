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
            v-model="selectedDateFinished"
            class="pl-1 backgroundGrey"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row style="height: 20vh;">
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
            rows="4"
            ></v-textarea>
        </v-col>
        <v-col cols="1" class="ml-3 mr-0 pt-0">
        </v-col>
    </v-row>
    <v-row v-if="position.lat || position.lng || picture">
      <v-col v-if="position.lat || position.lng">
        <GoogleMap />
      </v-col>
      <v-col v-if="picture" :style="windowHeight < 760 ? 'height: 24vh' : 'height: 33vh'">
        <Picture />
      </v-col>
    </v-row>
    <v-row style="position: fixed; bottom: 0; width: 100%" class="pb-3">
      <v-list-item @click="share" style="background-color: #37474F;">
        <v-list-item-icon>
          <v-icon color="#4FC3F7">{{ svgExportVariant }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title style="color: #4FC3F7">Versenden</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="$router.push('/reminder')" style="background-color: #37474F; border-bottom: 1px solid #4FC3F7; border-top: 1px solid #4FC3F7">
        <v-list-item-icon>
          <v-icon color="#4FC3F7">{{ svgUpdate }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title style="color: #4FC3F7">Erinnerung</v-list-item-title>
            <v-list-item-subtitle v-if="reminderSet" style="color: #4FC3F7">{{ selectedDate(selectedYearReminder, selectedMonthReminder, selectedDayReminder) }} {{ selectedYearReminder }} um {{ timeReminder }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item style="background-color: #37474F;" @click="sheet = !sheet">
        <v-list-item-icon>
          <v-icon color="#4FC3F7">{{ svgTrashCanOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-if="archived === false" style="color: #4FC3F7">Archivieren</v-list-item-title>
            <v-list-item-title v-if="archived === true" style="color: #4FC3F7">Löschen</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row>
      <v-bottom-sheet v-model="sheet" inset>
        <v-sheet
          class="text-center"
          height="180px"
          style="background-color: #37474F"
        >
          <v-card
          class="d-flex align-center mx-auto"
          height="60px"
          style="background-color: #37474F"
          flat
          @click="toggleArchive"
          >
            <v-card-text v-if="!archived" style="color: #4FC3F7" class="text-center">Archivieren</v-card-text>
            <v-card-text v-if="archived" style="color: #4FC3F7;" class="text-center"><b>Als offen markieren</b></v-card-text>
          </v-card>
          <v-card
          flat
          class="d-flex align-center mx-auto"
          height="60px"
          style="background-color: #37474F; border-top: 1px solid #4FC3F7; border-bottom: 1px solid #4FC3F7"
          @click="deleteThisDebt"
          >
            <v-card-text style="color: #4FC3F7" class="text-center">Löschen</v-card-text>
          </v-card>
          <v-card
          class="d-flex align-center mx-auto"
          height="60px"
          style="background-color: #37474F"
          flat
          @click="sheet = !sheet"
          >
            <v-card-text style="color: #4FC3F7;" class="text-center">Abbrechen</v-card-text>
          </v-card>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </div>
</template>

<script>
import { mdiCheck, mdiTrashCanOutline, mdiExportVariant, mdiUpdate } from '@mdi/js';
import { toggleArchiveDebt, deleteDebt } from "@/services/DebtsService";
import { mapState } from "vuex";
import modifyLocalDebtsMixin from "../mixins/modifyLocalDebtsMixin";
import getDayAndMonthMixin from "../mixins/getDayAndMonthMixin";
export default {
  name: 'FinishedDebt',
  data () {
    return {
      svgCheck: mdiCheck,
      svgTrashCanOutline: mdiTrashCanOutline,
      svgExportVariant: mdiExportVariant,
      svgUpdate: mdiUpdate,
      opacity: 1,
      overlay: false,
      sheet: false
    }
  },
  mixins: [modifyLocalDebtsMixin, getDayAndMonthMixin],
  computed: {
    ...mapState(["debts", "selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "archived", "position", "picture", "selectedDay", "selectedMonth", "selectedYear", "selectedDayReminder", "selectedMonthReminder", "selectedYearReminder", "timeReminder", "reminderSet"]),
    windowHeight() {
      return window.innerHeight;
    },
    selectedDateFinished() {
      return this.selectedDate(this.selectedYear, this.selectedMonth, this.selectedDay)
    }
  },
  components: {
    GoogleMap: () => import(/* webpackPrefetch: true */'@/components/GoogleMap.vue'),
    Picture: () => import(/* webpackPrefetch: true */'@/components/Picture.vue'),
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
    },
    share() {
      if (navigator.share) {
        navigator.share({
          title: 'Kurze Erinnerung',
          text: 'Hi ' + this.selectedPerson + ", \n\neine kleine Erinnerung.\nDu schuldest mir noch " + this.amount + " € vom " + this.selectedDay + "." + this.selectedMonth + "." + this.selectedYear + ".\n \"" + this.description + "\"",
          url: 'https://schuldenmanager.herokuapp.com/',
        })
      }
    },
  }
}
</script>

<style scoped>
    .centered-input >>> input {
        text-align: center !important;
    }
</style>