<template>
  <q-card style="min-width: 500px">
    <q-card-section>
      <div class="text-h6">Confirm Delete</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit.prevent="deleteUser" class="q-gutter-md">
        <q-input
          filled
          :value="username"
          placeholder="Username"
          required
          disable
        />

        <q-card-actions align="right">
          <q-btn
            class="hover"
            flat
            label="Delete"
            type="submit"
            color="primary"
            style="min-width: 70px"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "AddUserCard",
  props: ["selectedUser"], // get selected user details from parent component
  data() {
    return {
      id: this.selectedUser[0].id, // selected user id
      username: this.selectedUser[0].username, // selected user username
      error: null
    };
  },

  methods: {
    async deleteUser() {
      // search user in database with matching id and destroy row.
      console.log(this.username);
      console.log(this.id);
      try {
        const response = await AuthenticationService.deleteUser({
          data: {
            id: this.id,
            username: this.username
          }
        });
        console.log(response);
        this.$emit("closed");
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped>
.hover:hover {
  color: red;
}
</style>
