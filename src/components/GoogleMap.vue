<template>
    <GmapMap
    :center="currentPosition"
    :zoom="7"
    style="width: 100%;"
    v-bind:style="[((this.positionTemp.latitude || this.positionTemp.longitude) && $route.path === '/geolocation') ? {'height': windowHeight-140 + 'px'} : $route.path === '/geolocation' ? {'height': windowHeight-70 + 'px'} : windowHeight < 760 ? {'height': 20 + 'vh'} : {'height': 30 + 'vh'}]"
    >
        <GmapMarker
            :position="currentPosition"
        />
    </GmapMap>
</template>

<script>
import { mapState } from "vuex";
//import VueGeolocation from 'vue-browser-geolocation';
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

        if (!positionHelper.latitude && !positionHelper.longitude) {
            navigator.geolocation.getCurrentPosition(position => {
                this.$store.dispatch("updateCurrentPosition", position.coords);
            })
        } else this.$store.dispatch("updateCurrentPosition", positionHelper); 
    },
}
</script>