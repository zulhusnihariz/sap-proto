<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      title="Current Database"
      :data="data"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected.sync="selected"
      :filter="filter"
      dense
    >
      <template v-slot:top>
        <q-btn
          class="q-ml-md"
          color="primary"
          :disable="selected.length == 0"
          label="Details"
          @click="viewDetailsAlert = true"
          icon="info"
          no-caps
        />

        <q-space />
        <q-input
          borderless
          filled
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import AuthenticationService from "../../services/AuthenticationService";

export default {
  name: "Database",

  data() {
    return {
      selected: [],
      viewDetailsAlert: false,
      confirm: false,
      filter: "",

      columns: [
        {
          name: "id",
          required: true,
          label: "Id",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "EmpID",
          label: "Employee ID ",
          align: "center",
          field: "EmpID",
          sortable: true
        },
        {
          name: "Name",
          label: "Name ",
          align: "center",
          field: "Name",
          sortable: true
        },
        {
          name: "DeptID",
          align: "center",
          label: "Department  ID",
          field: "DeptID",
          sortable: true
        },
        {
          name: "Department",
          align: "center",
          label: "Department",
          field: "Department",
          sortable: true
        },
        {
          name: "PositionID",
          align: "center",
          label: "PID",
          field: "PositionID",
          sortable: true
        },
        {
          name: "Position",
          align: "center",
          label: "Position",
          field: "Position",
          sortable: true
        },
        {
          name: "MngrName",
          align: "center",
          label: "Reporting Manager",
          field: "MngrName",
          sortable: true
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    };
  },
  methods: {
    async getDatabaseData() {
      try {
        const response = await AuthenticationService.getDatabaseData({});
        this.$store.dispatch("setDatabaseData", response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  mounted() {
    this.getDatabaseData();
  },
  computed: {
    data() {
      return this.$store.state.databaseData;
    }
  }
};
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 410px
  width:1020px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
