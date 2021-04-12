import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAvw2-EXN9KDOly2VBWkctz1T6izuYXC2k'
    },
})
export { VueGoogleMaps };