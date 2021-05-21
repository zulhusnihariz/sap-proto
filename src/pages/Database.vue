<template>
  <q-page class="flex flex-start">
    <div class="q-pa-md">
      <q-uploader
        accept=".xlsx,.xlx"
        color="secondary"
        label="Update database"
        ref="uploader"
        style="max-width: 300px"
        url="/database"
        :factory="onUpload"
        square
        flat
        bordered
      />
    </div>
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
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import ViewDetailsCard from "../components/ViewDetailsCard";
const XLSX = require("xlsx");

export default {
  name: "Database",
  components: {
    viewDetailsCard: ViewDetailsCard
  },
  data() {
    return {
      selected: [],
      viewDetailsAlert: false,
      confirm: false,
      filter: "",
      selectedFile: null,
      staffListing: null,
      fileData: null,

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
    async onUpload(event) {
      try {
        this.selectedFile = event[0];

        var reader = new FileReader();

        console.log(this.selectedFile);

        reader.onload = async function(e) {
          // The file's text will be printed here
          let data = e.target.result;
          let wb = XLSX.read(data, { type: "binary" });
          let ws = wb.Sheets[wb.SheetNames[0]];
          let jsondata = XLSX.utils.sheet_to_json(ws);

          console.log(jsondata);

          const response = await AuthenticationService.uploadData({
            data: jsondata
          });

          console.log(response);
        };
        reader.readAsBinaryString(this.selectedFile);
      } catch (error) {
        console.log(error);
      }
    },
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
