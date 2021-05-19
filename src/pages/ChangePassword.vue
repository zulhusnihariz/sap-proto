<template>
  <q-page class="flex flex-start column q-pa-md" style="max-width: 500px">
    <h3>Change Password</h3>
    <q-form @submit.prevent="change" class="q-gutter-md">
      <q-input v-model="username" filled disable />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        placeholder="Old Password"
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
        v-model="newPassword"
        filled
        type="password"
        placeholder="New Password"
      >
      </q-input>

      <q-input
        v-model="confirmPassword"
        filled
        type="password"
        placeholder="Confirm New Password"
      >
      </q-input>

      <div>
        <q-btn label="Change" type="submit" color="primary">
          <q-popup-proxy v-if="error">
            <q-banner>
              {{ error }}
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import { mapActions } from "vuex";

export default {
  name: "ChangePassword",
  data() {
    return {
      isPwd: true,
      username: this.$store.state.user.username,
      password: "",
      newPassword: "",
      confirmPassword: "",
      error: null
    };
  },
  methods: {
    async change() {
      console.log("change button was clicked");
      try {
        const response = await AuthenticationService.change({
          username: this.username,
          password: this.password,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });

        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.$router.push("/login");

        console.log(response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  computed: {
    ...mapActions("store", ["setToken", "setUser"])
  }
};
</script>
