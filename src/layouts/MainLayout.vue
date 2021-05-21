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

      <navDrawerList></navDrawerList>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavDrawerList from "../components/MainLayout/NavDrawerList";
export default {
  name: "MainLayout",
  components: {
    navDrawerList: NavDrawerList
  },
  data() {
    return {
      left: false
    };
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
