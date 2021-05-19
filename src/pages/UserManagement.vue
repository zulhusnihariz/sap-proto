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
            @click="addUser = true"
            icon="add"
            no-caps
          />

          <q-btn
            class="q-ml-md"
            color="primary"
            :disable="selected.length == 0"
            label="Delete"
            @click="confirmDelete = true"
            icon="delete"
            no-caps
          />

          <q-btn
            class="q-ml-md"
            color="primary"
            :disable="selected.length == 0"
            label="Details"
            @click="viewDetails = true"
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
      <q-dialog v-model="addUser">
        <addUserCard @added="allUser" @closed="addUser = false"></addUserCard>
      </q-dialog>

      <q-dialog v-model="confirmDelete">
        <confirmDeleteCard
          :selectedUser="!selected ? 'none' : selected"
          @deleted="allUser"
          @closed="confirmDelete = false"
        ></confirmDeleteCard>
      </q-dialog>
      <q-dialog v-model="viewDetails">
        <viewDetailsCard
          :selectedUser="!selected ? 'none' : selected"
        ></viewDetailsCard>
      </q-dialog>

      <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import AddUserCard from "../components/AddUserCard";
import ConfirmDeleteCard from "../components/ConfirmDeleteCard";
import ViewDetailsCard from "../components/ViewDetailsCard";

export default {
  components: {
    addUserCard: AddUserCard,
    confirmDeleteCard: ConfirmDeleteCard,
    viewDetailsCard: ViewDetailsCard
  },
  data() {
    return {
      selected: [],
      addUser: false,
      confirmDelete: false,
      viewDetails: false,
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
          align: "center",
          field: "username",
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true
        },

        {
          name: "role",
          align: "center",
          label: "Role",
          field: "role",
          sortable: true
        },

        {
          name: "createdAt",
          label: "createdAt",
          align: "center",
          field: "createdAt"
        }
      ]
    };
  },
  methods: {
    async allUser() {
      try {
        const response = await AuthenticationService.allUser({});
        this.$store.dispatch("setAllUser", response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  mounted() {
    this.allUser();
  },
  computed: {
    data() {
      return this.$store.state.allUser;
    }
  }
};
</script>
