<template>
    <div>
        <v-row class="pa-0">
            <GoogleMap />
        </v-row>
        <v-row>
            <DeleteGeolocation v-if="positionTemp.lat || positionTemp.lng" />
        </v-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'Geolocation',
    components: {
        GoogleMap: () => import('@/components/GoogleMap.vue'),
        DeleteGeolocation: () => import('@/components/DeleteGeolocation.vue')
    },
    computed: {
      ...mapState(["positionTemp"])
    }
}
</script>