<template>
  <q-page class="flex flex-start">
    <databaseUpload v-if="uploadMode"></databaseUpload>
    <databaseView v-if="viewMode"></databaseView>
    <databaseGenerate v-if="generateMode"></databaseGenerate>
  </q-page>
</template>

<script>
import DatabaseUpload from "../components/Database/DatabaseUpload";
import DatabaseView from "../components/Database/DatabaseView";
import DatabaseGenerate from "../components/Database/DatabaseGenerate";
export default {
  name: "Database",
  components: {
    databaseUpload: DatabaseUpload,
    databaseView: DatabaseView,
    databaseGenerate: DatabaseGenerate
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
