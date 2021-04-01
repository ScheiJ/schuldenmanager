<template>
    <div>
        <v-row justify="center">
            <v-col cols="2"></v-col>
            <v-col>
                <div class="camera-box">  
                    <video v-show="!pictureTaken" id="camera" ref="camera" width="100%" height="100%" autoplay></video>
                    <canvas v-show="pictureTaken" ref="canvas" id="photoTaken"></canvas>
                </div>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <v-row justify="center" class="mt-0 pt-2">
            <v-btn
            v-if="!pictureTaken"
            class="mr-3"
            elevation="2"
            rounded
            @click="returnToModify"
            >
                <span>Abbrechen</span>
            </v-btn>
            <v-btn
            v-if="!pictureTaken"
            class="mr-3"
            color="light-blue lighten-2"
            elevation="2"
            outlined
            rounded
            @click="takePhoto"
            >
                <span>Foto aufnehmen</span>
            </v-btn>
            <v-btn
            v-if="!pictureTaken"
            color="light-blue lighten-2"
            elevation="2"
            outlined
            rounded
            @click="swapCamera"
            >
                <span>Kamera wechseln</span>
            </v-btn>
            <v-btn
            v-if="pictureTaken"
            class="mr-3"
            color="light-blue lighten-2"
            elevation="2"
            outlined
            rounded
            @click="pictureTaken = false"
            >
                <span>Neu</span>
            </v-btn>
            <v-btn
            v-if="pictureTaken"
            @click="returnToModify"
            color="light-blue lighten-2"
            elevation="2"
            outlined
            rounded
            >
                <span>Foto benutzen</span>
            </v-btn>
        </v-row>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: "Camera",
    data() {
        return {
            mode: 'environment',
            pictureTaken: false
        }
    },
    computed: {
        ...mapState(["picture"])
    },
    mounted() {
        this.createCameraElement(this.mode);
    },
    beforeDestroy() {
        this.stopCameraStream();
    },
    methods: {
        createCameraElement(mode) {
            const constraints = (window.constraints = {
                audio: false,
                video: {
                    facingMode: {
                        exact: mode
                    }
                }
            });


            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                })
                .catch(() => {
                    alert("May the browser didn't support or there is some errors.");
                });
        },
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },
        swapCamera() {
            this.stopCameraStream();
            this.mode === 'environment' ? this.mode = 'user' : this.mode = 'environment';
            this.createCameraElement(this.mode);
        },
        returnToModify() {
            this.$router.push('/modifyDebt');
        },
        takePhoto() {
            let height = document.getElementById('camera').offsetHeight;
            let width = document.getElementById('camera').offsetWidth;
            let canvas = document.getElementById('photoTaken');
            canvas.width = width;
            canvas.height = height;
            this.pictureTaken = true;

            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.camera, 0, 0, width, height);

            const formData = new FormData();
            canvas.toBlob(function(blob) {
                let file = new File([blob], "ownImage.png")

                formData.append('image', file, file.name);
            });
            this.$store.dispatch("updatePicture", formData);
        }
    }
}
</script>