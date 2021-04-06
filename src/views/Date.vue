<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="10">
      <DatePicker />
    </v-col>
  </v-row>
</template>

<script>
export default {
    name: 'Date',
    components: {
      DatePicker: () => import('@/components/DatePicker.vue')
    }
}
</script>
