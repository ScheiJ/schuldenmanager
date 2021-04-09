<template>
    <div>
        <v-row>
            <GoogleMap />
        </v-row>
        <v-row>
            <DeleteButton v-if="positionTemp.lat || positionTemp.lng" />
        </v-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'Geolocation',
    components: {
        GoogleMap: () => import(/* webpackPrefetch: true */'@/components/GoogleMap.vue'),
        DeleteButton: () => import(/* webpackPrefetch: true */'@/components/DeleteButton.vue')
    },
    computed: {
      ...mapState(["positionTemp"])
    }
}
</script>