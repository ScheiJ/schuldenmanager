<template>
  <div>
    <v-row>
        <v-col cols="1" class="mt-5 mr-3">
            <div class="circle" @click="turnAround" v-bind:class="{ turnGreen: isGreen, turnRed: isGreen === false}"></div>
        </v-col>
        <v-col class="mt-3 ml-3">
            <v-text-field 
            type="number"
            solo
            flat
            filled
            placeholder="0,00"
            class="centered-input"
            suffix=" €"
            single-line
            ></v-text-field>
        </v-col>
        <v-col class="mt-3 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4">
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
        <v-col cols="1" class="mr-3">
        </v-col>
        <v-col class="ml-3">
            <v-textarea
            id="textFieldDescription"
            label="Keine Beschreibung"
            solo
            flat
            no-resize
            ></v-textarea>
        </v-col>
        <v-col class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4">
            <v-btn
            depressed
            color="#ffffff"
            class="mb-3 ml-4"
            ><v-icon>mdi-map-marker-radius</v-icon></v-btn>
            <br>
            <v-btn
            depressed
            color="#ffffff"
            class="ml-4"
            ><v-icon>mdi-camera</v-icon></v-btn>
        </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: 'NewDebt',

    components: {
      //HelloWorld,
    },
    data: () => {
      return {
        isGreen: null,
        selectedDay: "0" + String(new Date().getDate()),
        selectedMonth: new Date().getMonth(),
        selectedYear: new Date().getFullYear(),
      }
    },
    computed: {
      ...mapState(["selectedPerson"]),
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
      }
    },
    mounted: function () {
        document.getElementById("textFieldDescription").setAttribute("rows", window.innerHeight/45)
    },
    methods: {
        turnAround() {
            if(this.isGreen === null) this.isGreen = false;
            else this.isGreen = !this.isGreen;
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

    /* The animation code */
    @keyframes rotateYGreen {
        0% { transform: rotateY(0deg); }
        0% { background: #8BC34A; border-color: #8BC34A; }
        60% { background: #C62828; border-color: #C62828; }
        100% { background: #C62828; border-color: #C62828; }
        100% { transform: rotateY(180deg); };
    }

    @keyframes rotateYRed {
        0% { transform: rotateY(0deg); }
        0% { background: #C62828; border-color: #C62828; }
        60% { background: #8BC34A; border-color: #8BC34A; }
        100% { background: #8BC34A; border-color: #8BC34A; }
        100% { transform: rotateY(180deg); };
    }

    .turnGreen {
        animation: rotateYRed 0.5s forwards;
    }

    .turnRed {
        animation: rotateYGreen 0.5s forwards;
    }
</style>>
