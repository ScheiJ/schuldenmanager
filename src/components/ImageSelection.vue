<template>
    <v-row justify="center" class="mb-0" style="position:fixed; bottom: 0; width: 100%; background-color: #37474F; height: 8vh">
        <v-col cols="2">
            <v-card
            class="d-flex align-center"
            height="40px"
            style="border: 1px solid #4FC3F7"
            color="#37474F"
            @click="takePicture"
            >
                <v-card-text v-if="!picture" style="color: #4FC3F7" class="text-center">Foto aufnehmen</v-card-text>
                <v-card-text v-if="picture" style="color: #4FC3F7; line-height: 1.2" class="text-center">Neues Foto aufnehmen</v-card-text>
            </v-card>
        </v-col>
        <v-col cols="2">
            <v-card
            class="d-flex align-center"
            height="40px"
            style="border: 1px solid #4FC3F7"
            color="#37474F"
            @click="$refs.upload.click()"
            >
                <v-card-text v-if="!picture" style="color: #4FC3F7" class="text-center">Foto auswählen</v-card-text>
                <v-card-text v-if="picture" style="color: #4FC3F7; line-height: 1.2" class="text-center">Neue Foto auswählen</v-card-text>
                <input v-show="false" ref="upload" type="file" name="image" @change="selectPicture"/>
            </v-card>
        </v-col>
        <v-col cols="2" v-if="picture">
            <v-card
            class="d-flex align-center"
            height="40px"
            style="border: 1px solid red"
            color="#37474F"
            @click="deletePicture"
            >
                <v-card-text style="color: red" class="text-center">Foto löschen</v-card-text>
            </v-card>
        </v-col>
        <v-col cols="1">
            <v-icon class="mt-2" @click="resetShowImageSelection" v-model="picture" color="light-blue lighten-2">{{ svgClose }}</v-icon>
        </v-col>
    </v-row>
</template>

<script>
import { mdiClose } from '@mdi/js';
import { mapState } from "vuex";
export default {
    name: 'ImageSelection',
    data () {
      return {
        svgClose: mdiClose
      }
    },
    computed: {
      ...mapState(["showImageSelection", "picture"])
    },
    methods: {
        resetShowImageSelection() {
            this.$store.dispatch('updateShowImageSelection', false)
        },
        takePicture() {
            this.resetShowImageSelection();
            this.$router.push('/camera');
        },
        selectPicture(event) {
            const file = event.target.files[0]
            let fd = new FormData();
            fd.append('image', file, file.name)
            this.$store.dispatch("updatePicture", fd);
            this.resetShowImageSelection();
        },
        deletePicture() {
            this.$store.dispatch('updatePicture', "");
            this.resetShowImageSelection();
        }
    }
}
</script>
