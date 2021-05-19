<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            :disable="loading"
            label="Add user"
            @click="alert = true"
          />

          <q-space />
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-dialog v-model="alert" style="max-width: 500px">
            <q-card maximized>
              <q-card-section>
                <div class="text-h6">Add user</div>
              </q-card-section>
              <q-card-section>
                <addUserCard></addUserCard>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
// import { mapActions } from "vuex";

export default {
  components: {
    addUserCard: require("components/AddUserCard").default
  },
  data() {
    return {
      alert: false,
      confirm: false,
      prompt: false,
      address: "",
      filter: "",
      data: this.$store.state.allUser,
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
          name: "username",
          label: "username ",
          align: "center",
          field: "username",
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: "email",
          field: "email",
          sortable: true
        },

        {
          name: "createdAt",
          label: "createdAt",
          align: "center",
          field: "createdAt"
        },
        {
          name: "updatedAt",
          label: "updatedAt",
          align: "center",
          field: "updatedAt"
        }
      ]
    };
  },
  methods: {
    async allUser() {
      try {
        const response = await AuthenticationService.allUser({});
        console.log(response.data);
        this.$store.dispatch("setAllUser", response.data);
        console.log(this.$store.state.allUser);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  // },
  // computed: {
  //   ...mapActions("store", ["setAllUser"])
  // },

  created() {
    this.allUser();
  }
};
</script>
