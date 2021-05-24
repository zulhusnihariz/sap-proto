<template>
  <div class="q-pb-md">
    <q-btn class="q-mb-md q-pt-none" no-caps @click="createExcel"
      >Create Excel</q-btn
    >

    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      title="Current Database"
      :data="data"
      :columns="columns()"
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
          @click="addExcelData"
          icon="add"
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

    <q-table
      class="my-sticky-virtscroll-table q-mt-lg"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      title="Current Database"
      :data="exceldata"
      :columns="excelcolumns()"
      :row-key="row => row.EmpID"
      selection="single"
      :selected.sync="excelselected"
      :filter="filter"
      dense
      square
      flat
    >
      <template v-slot:top>
        <q-btn
          class="q-ml-md"
          color="primary"
          :disable="selected.length == 0"
          @click="removeExcelData"
          icon="remove  "
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
import AuthenticationService from "../../../services/AuthenticationService";

import { saveAs } from "file-saver";
const XLSX = require("xlsx");

export default {
  name: "Database",

  data() {
    return {
      selected: [],
      excelselected: [],
      viewDetailsAlert: false,
      confirm: false,
      filter: "",
      exceldata: [],
      selectedcolumns: this.$store.state.changeDepartmentColumn,
      rowIndex: null,
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
    },
    columns() {
      return Object.keys(this.$store.state.databaseData[0]).map(key => {
        return {
          name: key,
          label: key,
          align: "left",
          sortable: true,
          field: key
        };
      });
    },
    rowkey() {
      if (!this.excelselected) {
        return "name";
      } else {
        return Object.values(excelselected[0])[0];
      }
    },
    excelcolumns() {
      return this.selectedcolumns.map(col => {
        return {
          name: col,
          label: col,
          align: "left",
          sortable: true,
          field: col
        };
      });
    },
    addExcelData() {
      const filtered = Object.fromEntries(
        Object.entries(this.selected[0]).filter(([key, val]) =>
          this.$store.state.changeDepartmentColumn.includes(key)
        )
      );

      this.exceldata.push(filtered);

      console.log(filtered);
    },
    removeExcelData() {
      this.rowIndex = this.exceldata.findIndex(
        item => item.EmpID === Object.values(this.excelselected[0])[0]
      );

      this.exceldata.splice(this.rowIndex, 1);

      console.log(this.rowIndex);
    },
    async createExcel() {
      var wb = XLSX.utils.book_new();

      var ws_data = this.exceldata;
      // push data selected from table into this array;

      var ws = XLSX.utils.json_to_sheet(ws_data);
      // wb.Sheets["Test Sheet"] = ws;

      XLSX.utils.book_append_sheet(wb, ws, "Change Department");

      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf); //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
        return buf;
      }

      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "test.xlsx"
      );
    }
  },
  mounted() {
    this.getDatabaseData();
  },
  computed: {
    data() {
      return this.$store.state.databaseData;
    },
    viewMode() {
      if (this.$route.path == "/database/view") {
        return true;
      } else {
        return false;
      }
    },
    generateMode() {
      if (this.$route.path == "/database/generate") {
        return true;
      } else {
        return false;
      }
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
