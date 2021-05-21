<template>
  <div class="q-pt-md" style="max-width: 350px">
    <q-list>
      <q-item
        v-if="$store.state.isUserLogged"
        :to="{ name: 'Home' }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="home" />
        </q-item-section>
        <q-item-section class="text-weight-bold">Home</q-item-section>
      </q-item>

      <q-item
        v-if="!$store.state.isUserLogged"
        :to="{ name: 'Login' }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="login" />
        </q-item-section>
        <q-item-section class="text-weight-bold">Login</q-item-section>
      </q-item>

      <q-list>
        <q-expansion-item
          v-if="$store.state.isUserLogged"
          expand-separator
          class="text-weight-bold"
          icon="fas fa-database"
          label="Database"
        >
          <q-item
            :to="{ name: 'DatabaseUpload' }"
            v-if="
              $store.state.isUserLogged && $store.state.user.role == 'admin'
            "
            clickable
            v-ripple
          >
            <q-item-section class="text-weight-regular">Upload</q-item-section>
          </q-item>
          <q-item :to="{ name: 'DatabaseView' }" clickable v-ripple>
            <q-item-section class="text-weight-regular">View</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>

      <q-list>
        <q-expansion-item
          v-if="$store.state.isUserLogged && $store.state.user.role == 'admin'"
          expand-separator
          class="text-weight-bold"
          icon="manage_accounts"
          label="User Management"
        >
          <q-item :to="{ name: 'UserManagement' }" clickable v-ripple>
            <q-item-section class="text-weight-regular">Users</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>

      <q-list>
        <q-expansion-item
          v-if="$store.state.isUserLogged"
          expand-separator
          class="text-weight-bold"
          icon="settings"
          label="Settings"
        >
          <q-item :to="{ name: 'ChangePassword' }" clickable v-ripple>
            <q-item-section class="text-weight-regular"
              >Change Password</q-item-section
            >
          </q-item>
        </q-expansion-item>
      </q-list>

      <q-item
        v-if="$store.state.isUserLogged"
        @click="logOut"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon color="primary" name="logout" />
        </q-item-section>
        <q-item-section class="text-weight-bold">Logout</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "NavDrawerList",
  data() {
    return {
      left: false
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  }
};
</script>
