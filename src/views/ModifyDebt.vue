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
          v-model="selectedDateModify"
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
          @click="pictureOsDecision"
          depressed
          color="#ffffff"
          class="ml-4"
          ><v-icon>{{ svgCamera }}</v-icon>
          </v-btn>
      </v-col>
    </v-row>
    <v-bottom-sheet inset v-model="sheet">
      <v-sheet
      class="text-center"
      v-bind:height="pictureTemp ? '240px' : '180px'"
      style="background-color: #37474F"
      >
        <v-card
        class="d-flex align-center mx-auto"
        height="60px"
        style="background-color: #37474F"
        flat
        @click="takePicture"
        >  
          <v-card-text v-if="!pictureTemp" style="color: #4FC3F7" class="text-center">Foto aufnehmen</v-card-text>
          <v-card-text v-if="pictureTemp" style="color: #4FC3F7;" class="text-center">Neues Foto aufnehmen</v-card-text>
        </v-card>
        <v-card
        flat
        class="d-flex align-center mx-auto"
        height="60px"
        style="background-color: #37474F; border-top: 1px solid #4FC3F7; border-bottom: 1px solid #4FC3F7"
        @click="$refs.upload.click()"
        >
          <v-card-text v-if="!pictureTemp" style="color: #4FC3F7" class="text-center">Foto auswählen</v-card-text>
          <v-card-text v-if="pictureTemp" style="color: #4FC3F7;" class="text-center">Neues Foto auswählen</v-card-text>
        </v-card>
        <v-card
        class="d-flex align-center mx-auto"
        height="60px"
        style="background-color: #37474F; border-bottom: 1px solid #4FC3F7"
        flat
        v-if="pictureTemp"
        @click="deletePicture"
        >
          <v-card-text style="color: red" class="text-center">Foto löschen</v-card-text>
        </v-card>
        <v-card
        class="d-flex align-center mx-auto"
        height="60px"
        style="background-color: #37474F;"
        flat
        @click="sheet = false"
        >
          <v-card-text style="color: #4FC3F7;" class="text-center">Abbrechen</v-card-text>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
    <input v-show="false" ref="upload" accept="image/*" type="file" name="image" @change="selectPicture"/>
  </div>
</template>

<script>
  import { mdiCheck, mdiMap, mdiCamera } from '@mdi/js';
  import "@/plugins/vuetify-money.js";
  import { mapState } from "vuex";
  import getDayAndMonthMixin from "../mixins/getDayAndMonthMixin";
  export default {
    name: 'ModifyDebt',
    mixins: [getDayAndMonthMixin],
    data: () => {
      return {
        sheet: false,
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
      ...mapState(["isPositiveTemp", "amountTemp", "descriptionTemp", "archivedTemp", "positionTemp", "pictureTemp", "selectedDayTemp", "selectedMonthTemp", "selectedYearTemp"]),
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
      selectedDateModify() {
        return this.selectedDate(this.selectedYearTemp, this.selectedMonthTemp, this.selectedDayTemp)
      }
    },
    methods: {
      //flips red/green coin
      turnAround() {
          if(this.isPositiveTemp === null) this.$store.dispatch("updateIsPositiveTemp", false);
          else this.$store.dispatch("updateIsPositiveTemp", !this.isPositiveTemp);
      },
      //when user wants to take a picture 
      takePicture() {
        this.sheet = false;
        this.$router.push('/camera');
      },
      selectPicture(event) {
        const file = event.target.files[0]
        let fd = new FormData();
        fd.append('image', file, Date.now() + '_' + file.name)
        this.$store.dispatch("updatePictureTemp", fd);
        this.sheet = false;
      },
      deletePicture() {
        this.$store.dispatch('updatePictureTemp', "");
        this.sheet = false;
      },
      //when on android, just use input field, when not, use dialog
      pictureOsDecision() {
        if(this.getOS() === 'iOS' || this.getOS() === 'Android') {
          this.$refs.upload.click()
        } else {
          this.sheet = true;
        }
      },
      getOS() {
        let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }

        return os;
      }
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
