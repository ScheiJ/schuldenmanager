<template>
    <img width="100%" height="100%" id="image">
</template>

<script>
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
            document.getElementById('image').src = "http://127.0.0.1:8000/image/" + this.picture;
        }
    }
}
</script>