<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey "
        active-color="primary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
        keep-alive
        style="min-width: 1020px"
      >
        <q-tab name="excelformat" label="Excel Format" />
        <q-tab name="database" label="Database" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" ref="panels" @next="gonext" animated>
        <q-tab-panel name="excelformat">
          <div class="row">
            <div class="col-8"><sheetsCard></sheetsCard></div>
            <div class=" col-4 flex items-start justify-end">
              <q-btn @click="gonext"> Next </q-btn>
            </div>
            <q-separator />
          </div>
          <div class="col">
            <changeDepartmentCard></changeDepartmentCard>
          </div>
        </q-tab-panel>

        <q-tab-panel name="database">
          <p></p>
          <databaseTable></databaseTable>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import SheetsCard from "../../components/Database/DatabaseGenerate/SheetsCard";
import ChangeDepartmentCard from "../../components/Database/DatabaseGenerate/ChangeDepartmentCard";
import DatabaseTable from "../../components/Database/DatabaseGenerate/DatabaseTable";
export default {
  name: "DatabaseGenerate",
  components: {
    sheetsCard: SheetsCard,
    changeDepartmentCard: ChangeDepartmentCard,
    databaseTable: DatabaseTable
  },
  data() {
    return {
      tab: "mails"
    };
  },
  methods: {
    gonext() {
      this.$refs.panels.next();
    },
    async createExcel() {
      var wb = XLSX.utils.book_new();

      var ws_data = [
        // push data selected from table into this array;
        { Name: "Zulhusni Hariz", Department: "GHC" },
        { Name: "shadab", Department: "T&I" }
      ];
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
  }
};
</script>
