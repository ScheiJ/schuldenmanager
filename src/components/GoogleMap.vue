<template>
    <GmapMap
    :center="currentPosition"
    :zoom="7"
    style="width: 100%;"
    v-bind:style="[((this.positionTemp.lat || this.positionTemp.lng) && $route.path === '/geolocation') ? {'height': windowHeight-140 + 'px'} : $route.path === '/geolocation' ? {'height': windowHeight-70 + 'px'} : windowHeight < 760 ? {'height': 20 + 'vh'} : {'height': 30 + 'vh'}]"
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
      ...mapState(["position", "currentPosition", "positionTemp"]),
      windowHeight() {
          return window.innerHeight;
      }
    },
    created() {
        let positionHelper = this.$router.path === '/geolocation' ? this.positionTemp : this.position;

        if (!positionHelper.lat && !positionHelper.lng) {
            VueGeolocation.getLocation({})
            .then(coordinates => {
                this.$store.dispatch("updateCurrentPosition", coordinates);
            })
            .catch(error => alert(error))
        } else this.$store.dispatch("updateCurrentPosition", positionHelper); 
    },
}
</script>