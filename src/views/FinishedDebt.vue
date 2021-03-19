<template>
  <div>
    <v-row>
        <v-col cols="1" class="mt-5 ml-3 mr-0 pb-0">
            <div v-if="!archived" class="circle" v-bind:class="{ green: isPositive, red: isPositive === false}"></div>
            <v-icon v-if="archived">mdi-check</v-icon>
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
            class="pl-1"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
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
            no-resize
            ></v-textarea>
        </v-col>
        <v-col cols="1" class="ml-3 mr-0 pt-0">
        </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
          <v-list-item-group style="position: fixed; bottom: 0; width: 100%">
            <v-list-item style="background-color: #37474F">
                <v-list-item-icon>
                  <v-icon style="color: #4FC3F7">mdi-trash-can-outline</v-icon>
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
                            @click="toggleArchiveDebt"
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
                            @click="deleteDebt"
                            >
                            <v-card-text style="color: #4FC3F7" class="text-center">Löschen</v-card-text>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-icon @click="overlay = false" class="mt-2" color="light-blue lighten-2">mdi-close</v-icon>
                        </v-col>
                    </v-row>
                </v-overlay>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DebtsService from "@/services/DebtsService";
import { mapState } from "vuex";
export default {
    name: 'FinishedDebt',
    components: {
        //HelloWorld,
    },
    data () {
      return {
        absolute: true,
        opacity: 1,
        overlay: false,
      }
    },
    computed: {
      ...mapState(["selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived"]),
      selectedDate: function () {
        var d = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        var month = new Array();
        month[0] = "Jan.";
        month[1] = "Feb.";
        month[2] = "März";
        month[3] = "Apr.";
        month[4] = "Mai";
        month[5] = "Juni";
        month[6] = "Juli";
        month[7] = "Aug.";
        month[8] = "Sept.";
        month[9] = "Okt.";
        month[10] = "Nov.";
        month[11] = "Dez.";
        return this.selectedDay + ". " + month[d.getMonth()];
      },
    },
    mounted: function () {
        document.getElementById("textFieldDescription").setAttribute("rows", window.innerHeight/60)
    },
    methods: {
        async toggleArchiveDebt() {
            await DebtsService.toggleArchiveDebt({
                id: this.selectedDebtId,
            });    
            this.$router.push("/")
        },
        async deleteDebt() {
            await DebtsService.deleteDebt(this.selectedDebtId);    
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
    .centered-input >>> input {
        text-align: center !important;
    }
    
    .circle {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #8BC34A;
        border: 5px solid #8BC34A;
        margin: auto;
    } 

    .green {
        background: #8BC34A; border-color: #8BC34A;
    }

    .red {
        background: #C62828; border-color: #C62828;
    }
</style>>
