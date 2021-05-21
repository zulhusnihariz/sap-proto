<template>
  <q-card style="min-width: 500px">
    <q-card-section>
      <div class="text-h6">User details</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit.prevent="addUser" class="q-gutter-md">
        <q-input
          v-model="username"
          placeholder="Username"
          dense
          filled
          disable
        />

        <q-input
          dense
          filled
          v-model="email"
          placeholder="Email"
          type="email"
          disable
        />

        <q-input
          dense
          filled
          v-model="contactnumber"
          placeholder="Contact Number"
          type="tel"
          disable
        />

        <q-input dense filled v-model="role" placeholder="Role" disable />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "ViewDetailsCard",
  props: ["selectedUser"],
  data() {
    return {
      username: this.selectedUser[0].username,
      email: this.selectedUser[0].email,
      contactnumber: this.selectedUser[0].contactnumber,
      role: this.selectedUser[0].role,
      error: null
    };
  }
};
</script>
