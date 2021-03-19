<template>
  <div>
    <v-row>
        <v-col cols="1" class="mt-5 ml-3 mr-0 pb-0">
            <div v-if="!archived" class="circle" @click="turnAround" v-bind:class="{ turnGreen: isPositive, turnRed: isPositive === false}"></div>
            <v-icon v-if="archived">mdi-check</v-icon>
        </v-col>
        <v-col class="mt-3 ml-3 pb-0">
          <vuetify-money
            v-model="amount"
            v-bind:placeholder="placeholder"
            v-bind:readonly="readonly"
            v-bind:disabled="disabled"
            v-bind:outlined="outlined"
            v-bind:clearable="clearable"
            v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
            v-bind:options="options"
            v-bind:properties="properties"
            class="centered-input"
          />
        </v-col>
        <v-col class="mt-3 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4 pb-0">
            <v-text-field
            @click="$router.push('/time')"
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
        <v-col cols="1" class="ml-3 mr-0 pt-0">
        </v-col>
        <v-col class="pt-0">
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
        <v-col class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4 pt-0">
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
    name: 'ModifyDebt',

    components: {
      //HelloWorld,
    },
    data: () => {
      return {
        placeholder: "0,00",
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: false,
        valueWhenIsEmpty: "",
        options: {
          locale: "de-de",
          prefix: "",
          suffix: "€",
          length: 11,
          precision: 2
        },
        properties: {
          filled: "filled",
          solo: "solo",
          flat: "flat"
        },
      }
    },
    computed: {
      ...mapState(["selectedPerson", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived"]),
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
      amount: {
        get() {
          return this.$store.state.amount;
        },
        set(value) {
          this.$store.dispatch('updateAmount', value);
        }
      },
      description: {
        get() {
          return this.$store.state.description;
        },
        set(value) {
          this.$store.dispatch('updateDescription', value);
        }
      },
    },
    mounted: function () {
        document.getElementById("textFieldDescription").setAttribute("rows", window.innerHeight/45)
    },
    methods: {
      turnAround() {
          if(this.isPositive === null) this.$store.dispatch("updateIsPositive", false);
          else this.$store.dispatch("updateIsPositive", !this.isPositive);
      },
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
