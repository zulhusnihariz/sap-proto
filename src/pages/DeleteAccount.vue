<template>
  <q-page class="flex flex-start q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="deleteUser" class="q-gutter-md">
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
  name: "DeleteAccount",
  data() {
    return {
      error: null
    };
  },
  methods: {
    async delete() {
      try {
        const response = await AuthenticationService.delete({
          username: this.$store.state.user.username
        });

        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.$router.push("/login");
        console.log(response);
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
