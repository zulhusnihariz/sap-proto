<template>
  <q-page class="flex flex-start">
    <databaseUpload v-if="uploadMode"></databaseUpload>
    <databaseView v-if="viewMode"></databaseView>
  </q-page>
</template>

<script>
import DatabaseUpload from "../components/Database/DatabaseUpload";
import DatabaseView from "../components/Database/DatabaseView";

export default {
  name: "Database",
  components: {
    databaseUpload: DatabaseUpload,
    databaseView: DatabaseView
  },
  computed: {
    uploadMode() {
      if (this.$route.path == "/database/upload") {
        return true;
      } else {
        return false;
      }
    },
    viewMode() {
      if (this.$route.path == "/database/view") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
