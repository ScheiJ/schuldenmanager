<template>
  <PersonsAndDebts />
</template>

<script>
import { mapState } from "vuex";
import PersonsAndDebts from "@/components/PersonsAndDebts.vue";
export default {
    name: 'DebtsOfOnePerson',
    components: {
        PersonsAndDebts,
    },
    data () {
      return {
        absolute: true,
        opacity: 1,
        overlay: false,
      }
    },
    computed: {
      ...mapState(["selectedPerson", "selectedDebtId", "isPositive", "amount", "description", "selectedDay", "selectedMonth", "selectedYear", "archived"]),
      
    },
    mounted: function () {
        
    },
    methods: {

    }
}
</script>
