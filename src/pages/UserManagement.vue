<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
        :filter="filter"
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            :disable="loading"
            label="Add"
            @click="addUserAlert = true"
            icon="add"
            no-caps
          />

          <q-btn
            class="q-ml-md"
            color="primary"
            :disable="selected.length == 0"
            label="Delete"
            @click="confirmDeleteAlert = true"
            icon="delete"
            no-caps
          />

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
      <q-dialog v-model="addUserAlert">
        <addUserCard
          @added="getAllUser"
          @closed="addUserAlert = false"
        ></addUserCard>
      </q-dialog>

      <q-dialog v-model="confirmDeleteAlert">
        <confirmDeleteCard
          :selectedUser="!selected ? 'none' : selected"
          @deleted="getAllUser"
          @closed="confirmDeleteAlert = false"
        ></confirmDeleteCard>
      </q-dialog>
      <q-dialog v-model="viewDetailsAlert">
        <viewDetailsCard
          :selectedUser="!selected ? 'none' : selected"
        ></viewDetailsCard>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import AddUserCard from "../components/UserManagement/AddUserCard";
import ConfirmDeleteCard from "../components/UserManagement/ConfirmDeleteCard";
import ViewDetailsCard from "../components/UserManagement/ViewDetailsCard";

export default {
  components: {
    addUserCard: AddUserCard,
    confirmDeleteCard: ConfirmDeleteCard,
    viewDetailsCard: ViewDetailsCard
  },
  data() {
    return {
      selected: [],
      addUserAlert: false,
      confirmDeleteAlert: false,
      viewDetailsAlert: false,
      confirm: false,
      prompt: false,
      loading: false,
      address: "",
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
          name: "username",
          label: "Username ",
          align: "left",
          field: "username",
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true
        },

        {
          name: "role",
          align: "left",
          label: "Role",
          field: "role",
          sortable: true
        },

        {
          name: "createdAt",
          label: "createdAt",
          align: "left",
          field: "createdAt"
        }
      ]
    };
  },
  methods: {
    async getAllUser() {
      try {
        const response = await AuthenticationService.getAllUser({});
        this.$store.dispatch("setAllUser", response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  mounted() {
    this.getAllUser();
  },
  computed: {
    data() {
      return this.$store.state.allUser;
    }
  }
};
</script>
