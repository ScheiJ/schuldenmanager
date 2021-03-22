<template>
    <v-row class="mb-14">
      <v-col class="pa-0">
        <v-list class="pa-0 mx-0">
            <v-list-item-group class="backgroundGrey">
                <v-subheader class="pt-10 pb-4">VERHALTEN</v-subheader>
                <v-list-item @click="toggleSettings('showTotalAmount')" class="backgroundWhite borderBottom">
                    <v-list-item-content>
                        <v-list-item-title>Gesamtsumme anzeigen</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="showTotalAmount">
                        <v-icon
                        class="ml-3"
                        small
                        color="#4FC3F7"
                        >mdi-check</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                 <v-list-item @click="toggleSettings('showAllFirst')" class="backgroundWhite borderBottom">
                    <v-list-item-content>
                        <v-list-item-title>Immer zu "Alle" öffnen</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="showAllFirst">
                        <v-icon
                        class="ml-3"
                        small
                        color="#4FC3F7"
                        >mdi-check</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                 <v-list-item @click="toggleSettings('easyList')" class="backgroundWhite borderBottom">
                    <v-list-item-content>
                        <v-list-item-title>Einfache Listenstruktur</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon v-if="easyList">
                        <v-icon
                        class="ml-3"
                        small
                        color="#4FC3F7"
                        >mdi-check</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
</template>

<script>
  import { mapState } from "vuex";
  import SettingsService from "@/services/SettingsService";
  export default {
    name: 'Settings',
    components: {
      //HelloWorld,
    },
    data: () => {
      return {

      }
    },
    computed: {
        ...mapState(["showTotalAmount", "showAllFirst", "easyList"]),
    },
    methods: {
      async toggleSettings(setting) {
        if (setting === 'showTotalAmount') await this.$store.dispatch('updateShowTotalAmount', !this.showTotalAmount);
        else if (setting === 'showAllFirst') await this.$store.dispatch('updateShowAllFirst', !this.showAllFirst);
        else if (setting === 'easyList') await this.$store.dispatch('updateEasyList', !this.easyList);
        await SettingsService.setSettings({
          showTotalAmount: this.showTotalAmount,
          showAllFirst: this.showAllFirst,
          easyList: this.easyList
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
