<template>
     <v-row class="ma-0">
        <v-col class="pa-0">
            <v-list-item-group style="position: fixed; bottom: 0; width: 100%;">
                <v-list-item @click="deleteThing" style="background-color: #37474F; height: 70px">
                    <v-list-item-content style="justify-content: center; display: grid; text-align: left">
                        <v-list-item-title style="color: #4FC3F7"><v-icon color="#4FC3F7">{{ svgTrashCanOutline }}</v-icon>Löschen</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { mdiTrashCanOutline } from '@mdi/js';
import { setReminder } from "@/services/DebtsService";
import modifyLocalDebtsMixin from "../mixins/modifyLocalDebtsMixin";
export default {
    name: "DeleteButton",
    data () {
        return {
            svgTrashCanOutline: mdiTrashCanOutline,
        }
    },
    mixins: [modifyLocalDebtsMixin],
    computed: {
        ...mapState(["selectedDebtId"])
    },
    methods: {
        async deleteThing() {
            if(this.$route.path === '/geolocation') {
                this.$store.dispatch("updatePositionTemp", {latitude: 0, longitude:0});
                this.$router.push('/modifyDebt');
            } else {
                this.$store.dispatch('updateReminderSet', false);
                this.$store.dispatch('updateSelectedYearReminder', new Date().getFullYear());
                this.$store.dispatch('updateSelectedMonthReminder', new Date().getMonth());
                this.$store.dispatch('updateSelectedDayReminder', new Date().getDate());
                this.$store.dispatch('updateTimeReminder', null);
                await setReminder({
                    id: this.selectedDebtId,
                    reminder: ""
                });
                let debtToChangeReminder = this.findIndexInLocalArray(this.debts, this.selectedDebtId);
                this.$store.dispatch("setTimeReminder", [debtToChangeReminder, ""]);
                this.$router.push('/finishedDebt');
            }
        }
    }
}
</script>