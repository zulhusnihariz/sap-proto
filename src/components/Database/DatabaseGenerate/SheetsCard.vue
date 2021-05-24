<template>
  <q-card class="q-ma-sm">
    <q-card-section>
      <div class="text-h6">Sheets</div>
      <div>
        <q-option-group
          v-model="group"
          :options="options"
          color="secondary"
          type="toggle"
          @input="setSheetsName"
          dense
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      group: [],
      options: [
        {
          label: "Change Department",
          value: "Change Department"
        },
        {
          label: "Change Reporting Line",
          value: "Change Reporting Line"
        }
      ]
    };
  },
  methods: {
    setSheetsName(newValue) {
      this.$store.dispatch("setSheetsName", newValue);
    }
  }
};
</script>
