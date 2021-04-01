<template>
    <GmapMap
    :center="currentPosition"
    :zoom="7"
    style="width: 100%;"
    v-bind:style="((this.position.lat || this.position.lng) && $route.path === '/geolocation')  ? 'height: 84vh;' : ($route.path === '/finishedDebt') ? 'height: 30vh;' : 'height: 92vh;'"
    >
        <GmapMarker
            :position="currentPosition"
        />
    </GmapMap>
</template>

<script>
import { mapState } from "vuex";
import VueGeolocation from 'vue-browser-geolocation';
export default {
    name: 'GoogleMap',
    computed: {
      ...mapState(["position", "currentPosition"])
    },
    created() {
        if(!this.position.lat && !this.position.lng) {
            VueGeolocation.getLocation({})
            .then(coordinates => {
                this.$store.dispatch("updateCurrentPosition", coordinates);
            })
            .catch(error => alert(error))
        } else this.$store.dispatch("updateCurrentPosition", this.position);
    },
}
</script>