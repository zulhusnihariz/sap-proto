<template>
  <q-page class="flex flex-start">
    <div class="q-pl-md">
      <h6 v-if="$store.state.isUserLogged">
        Welcome, {{ $store.state.user.username }}!
      </h6>
      <h6>Role: {{ $store.state.user.role }}</h6>
    </div></q-page
  >
</template>

<script>
export default {
  name: "Home"
};
</script>
