<template>
  <div class="q-pa-md">
    <q-uploader
      accept=".xlsx,.xlx"
      color="secondary"
      label="Update database"
      ref="uploader"
      style="max-width: 300px"
      url="/database/upload"
      :factory="onUpload"
      square
      flat
      bordered
    />
  </div>
</template>

<script>
import AuthenticationService from "../../services/AuthenticationService";
const XLSX = require("xlsx");

export default {
  name: "DatabaseUpload",
  data() {
    return {
      selectedFile: null,
      staffListing: null
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

        this.$router.push("/database/view");
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
