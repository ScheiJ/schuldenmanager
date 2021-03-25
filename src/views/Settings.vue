<template>
    <v-row class="mb-14">
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
            <v-list-item-group class="backgroundGrey">
                <v-subheader class="pt-10 pb-4">VERHALTEN</v-subheader>
                <v-list-item @click="toggleSettings(setting._id)" v-for="setting in settings" :key="setting._id" class="backgroundWhite borderBottom">
                    <v-list-item-content>
                        <v-list-item-title>{{ setting.prompt }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="setting.checked">
                        <v-icon
                        class="ml-3"
                        small
                        color="#4FC3F7"
                        >{{ checkIcon }}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
</template>

<script>
  import { mapState } from "vuex";
  import { mdiCheck } from '@mdi/js';
  import SettingsService from "@/services/SettingsService";
  import modifyLocalDebtsMixin from "../mixins/modifyLocalDebtsMixin";
  export default {
    name: 'Settings',
    data: () => {
      return {
        checkIcon: mdiCheck
      }
    },
    mixins: [modifyLocalDebtsMixin],
    computed: {
        ...mapState(["settings"]),
    },
    methods: {
      async toggleSettings(settingId) {
        let indexToToggleSetting = this.findIndexInLocalArray(this.settings, settingId);
        this.$store.dispatch('toggleSetting', indexToToggleSetting);
        await SettingsService.setSettings({
          _id: settingId
        });
      }
    }
  }
</script>

<style scoped>
.borderBottom {
  border-bottom: 3px solid #EEEEEE;
}
</style>
