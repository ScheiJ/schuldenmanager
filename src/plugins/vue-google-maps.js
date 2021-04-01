import Vue from 'vue'
import { googlemapskey } from '../creds';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: googlemapskey 
    },
})
export { VueGoogleMaps };