<template>
  <q-page class=" flex flex-start column q-pa-md" style="max-width: 500px">
    <h3>Login Page</h3>
    <q-form @submit.prevent="login" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        placeholder="Username"
        :rules="[val => !!val || 'Field is required']"
      />

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        placeholder="Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary">
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
  name: "Login",
  data() {
    return {
      isPwd: true,
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      console.log("login button was clicked");
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push("/");
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
