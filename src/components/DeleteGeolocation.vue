<template>
     <v-row class="ma-0">
        <v-col class="pa-0">
            <v-list-item-group style="position: fixed; bottom: 0; width: 100%;">
                <v-list-item @click="deletePosition" style="background-color: #37474F; height: 8vh">
                    <v-list-item-content style="justify-content: center; display: grid; text-align: left">
                        <v-list-item-title style="color: #4FC3F7"><v-icon color="#4FC3F7">{{ svgTrashCanOutline }}</v-icon>Löschen</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-col>
    </v-row>
</template>

<script>
import { mdiTrashCanOutline } from '@mdi/js';
export default {
    name: "DeleteGeolocation",
    data () {
        return {
            svgTrashCanOutline: mdiTrashCanOutline,
        }
    },
    methods: {
        deletePosition() {
            this.$store.dispatch("updatePosition", {lat: 0, lng:0});
            this.$router.push('/modifyDebt');
        }
    }
}
</script>