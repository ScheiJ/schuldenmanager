<template>
    <img width="100%" height="100%" id="image" alt="Dein Bild kann leider nicht angezeigt werden :-(">
</template>

<script>
/**
 * component for debt picture
 */
import { mapState } from "vuex";
export default {
    name: 'Picture',
    computed: {
      ...mapState(["picture"])
    },
    data: () => ({
      image: null
    }),
    mounted() {
        this.setSrc();
    },
    methods: {
        setSrc() {
            let fallbackSrc = localStorage.getItem(this.picture)
            document.getElementById('image').setAttribute("onerror", "this.onerror=null;this.src='" + fallbackSrc + "'");
            document.getElementById('image').src = "https://schuldenmanager-backend.herokuapp.com/image/" + this.picture; 
        },
    }
}
</script>