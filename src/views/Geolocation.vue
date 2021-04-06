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
        GoogleMap: () => import('@/components/GoogleMap.vue'),
        DeleteButton: () => import('@/components/DeleteButton.vue')
    },
    computed: {
      ...mapState(["positionTemp"])
    }
}
</script>