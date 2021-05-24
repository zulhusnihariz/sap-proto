<template>
  <q-card class="q-ma-sm">
    <q-card-section>
      <div class="text-h6">Change Department: Column</div>
      <q-option-group
        v-model="group"
        :options="options"
        color="green"
        type="checkbox"
        @input="setChangeDepartmentColumn(group)"
        dense
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      // value: true,
      group: [
        "Parent Department ID",
        "Parent Department Name",
        "Department",
        "DeptID",
        "PositionID",
        "EmpID",
        "Name",
        "Position",
        "EffectiveDate"
      ],
      options: [
        {
          label: "Parent Department Name",
          value: "Parent Department Name"
        },
        {
          label: "Parent Department ID",
          value: "Parent Department ID"
        },
        {
          label: "Department Name",
          value: "Department"
        },
        {
          label: "Department ID ",
          value: "DeptID"
        },
        {
          label: "Position ID",
          value: "PositionID"
        },
        {
          label: "Employee ID",
          value: "EmpID"
        },
        {
          label: "Name",
          value: "Name"
        },
        {
          label: "Position Title",
          value: "Position"
        },
        ,
        {
          label: "Effective Date",
          value: "EffectiveDate"
        }
      ]
    };
  },
  methods: {
    setChangeDepartmentColumn(newValue) {
      this.$store.dispatch("setChangeDepartmentColumn", newValue);
    }
  }
};
</script>
