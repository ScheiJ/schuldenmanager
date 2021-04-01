<template>
  <div>
    <v-row>
        <v-col cols="1" class="mt-5 ml-3 mr-0 pb-0">
            <div v-if="!archivedTemp" class="circleBig" @click="turnAround" v-bind:class="{ turnGreen: isPositiveTemp, turnRed: isPositiveTemp === false}"></div>
            <v-icon v-if="archivedTemp">{{ svgCheck }}</v-icon>
        </v-col>
        <v-col class="mt-3 ml-3 pb-0">
          <vuetify-money
            v-model="amountTemp"
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
            @click="$router.push('/date')"
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
          v-model="descriptionTemp"
          id="textFieldDescription"
          label="Keine Beschreibung"
          background-color="#EEEEEE"
          solo
          flat
          no-resize
          auto-grow
          ></v-textarea>
      </v-col>
      <v-col class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-4 pt-0">
          <v-btn
          v-bind:style="(this.positionTemp.lat || this.positionTemp.lng) ? 'border-bottom: 4px solid #8BC34A;' : 'border-bottom: none;'"
          @click="$router.push('/geolocation')"
          depressed
          color="#ffffff"
          class="mb-3 ml-4"
          ><v-icon>{{ svgMap }}</v-icon></v-btn>
          <br>
          <v-btn
          v-bind:style="this.pictureTemp ? 'border-bottom: 4px solid #8BC34A;' : 'border-bottom: none;'"
          @click="$store.dispatch('updateShowImageSelection', true)"
          depressed
          color="#ffffff"
          class="ml-4"
          ><v-icon>{{ svgCamera }}</v-icon></v-btn>
      </v-col>
    </v-row>
    <ImageSelection v-if="showImageSelection" />
  </div>
</template>

<script>
  import { mdiCheck, mdiMap, mdiCamera } from '@mdi/js';
  import "@/plugins/vuetify-money.js";
  import { mapState } from "vuex";
  import getFullDateMixin from "../mixins/getFullDateMixin";
  export default {
    name: 'ModifyDebt',
    mixins: [getFullDateMixin],
    components: {
      ImageSelection: () => import('@/components/ImageSelection.vue')
    },
    data: () => {
      return {
        svgCheck: mdiCheck,
        svgMap: mdiMap,
        svgCamera: mdiCamera,
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
      ...mapState(["isPositiveTemp", "amountTemp", "descriptionTemp", "archivedTemp", "positionTemp", "pictureTemp", "showImageSelection"]),
      amountTemp: {
        get() {
          return this.$store.state.amountTemp;
        },
        set(value) {
          this.$store.dispatch('updateAmountTemp', value);
        }
      },
      descriptionTemp: {
        get() {
          return this.$store.state.descriptionTemp;
        },
        set(value) {
          this.$store.dispatch('updateDescriptionTemp', value);
        }
      },
    },
    methods: {
      turnAround() {
          if(this.isPositiveTemp === null) this.$store.dispatch("updateIsPositiveTemp", false);
          else this.$store.dispatch("updateIsPositiveTemp", !this.isPositiveTemp);
      },
    }
  }
</script>

<style scoped>
    .centered-input >>> input {
        text-align: center !important;
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
