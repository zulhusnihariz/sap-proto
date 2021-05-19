<template>
  <q-layout view="lHr lpR fFr">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm"> Qsap</span>
          <q-icon
            name="fas fa-kiwi-bird"
            size="sm"
            color="white"
            class="header-icon q-pa-md lt-md"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-icon
        name="fas fa-kiwi-bird"
        size="lg"
        color="primary"
        class="q-pa-md"
      />

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

          <q-item
            v-if="$store.state.isUserLogged"
            :to="{ name: 'Database' }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-database" />
            </q-item-section>
            <q-item-section class="text-weight-bold">Database</q-item-section>
          </q-item>

          <q-list>
            <q-expansion-item
              v-if="$store.state.isUserLogged"
              expand-separator
              class="text-weight-bold"
              icon="manage_accounts"
              label="User Management"
            >
              <q-item :to="{ name: 'UserManagement' }" clickable v-ripple>
                <q-item-section class="text-weight-regular"
                  >Users</q-item-section
                >
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

              <!-- <q-item clickable v-ripple>
                <q-item-section class="text-weight-regular"
                  >Delete Account</q-item-section
                >
              </q-item> -->
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
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

<style lang="sass">
.header-icon
  position: absolute
  bottom:0
  left: 50%
  transform: translateX(-50%)
</style>
