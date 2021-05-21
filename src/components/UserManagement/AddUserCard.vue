<template>
  <q-card style="min-width: 500px">
    <q-card-section>
      <div class="text-h6">Add user</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit.prevent="addUser" class="q-gutter-md">
        <q-input v-model="username" placeholder="Username" filled required />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          placeholder="Password"
          required
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          filled
          v-model="email"
          placeholder="Email"
          type="email"
          required
        />

        <q-input
          filled
          v-model="contactnumber"
          placeholder="Contact Number"
          hint="Format = xxx-xxxxxxx"
          type="tel"
          required
        />

        <q-radio v-model="role" val="admin" label="Admin" />
        <q-radio v-model="role" val="staff" label="Staff" />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Add"
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
import AuthenticationService from "../../services/AuthenticationService";

export default {
  name: "AddUserCard",
  data() {
    return {
      isPwd: true,
      username: null,
      password: null,
      email: null,
      contactnumber: null,
      role: null,
      error: null
    };
  },
  methods: {
    async addUser() {
      console.log("addUser button was clicked");
      try {
        const response = await AuthenticationService.addUser({
          username: this.username,
          password: this.password,
          email: this.email,
          contactnumber: this.contactnumber,
          role: this.role
        });

        // this.$store.dispatch("addNewUser", {
        //   id: this.$store.state.allUser.length + 1,
        //   data: response.data
        // });
        this.$emit("added");
        this.$emit("closed");
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
