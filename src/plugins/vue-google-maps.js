import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps';
import { googlemapskey } from '../creds';

Vue.use(VueGoogleMaps, {
    load: {
        key: googlemapskey
    },
})
export { VueGoogleMaps };