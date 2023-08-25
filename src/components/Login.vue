<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent ref="form">
      <v-text-field
        v-model="username"
        :rules="[(v) => !!v || 'Username is required']"
        label="Username"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
      ></v-text-field>
      <v-btn
        type="submit"
        block
        class="mt-2"
        @click="login"
        :disabled="!isValid"
        >Login</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const emit = defineEmits(["isLogged"]);

const username = ref("");
const password = ref("");
const form = ref(null);

const isValid = computed(() => {
  return username.value.length > 0 && password.value.length > 0;
});

const login = async () => {
  // POST LOGIN
  emit("isLogged");
  // fetch(import.meta.env.VITE_API_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email: import.meta.env.VITE_API_USER,
  //     password: import.meta.env.VITE_API_PASS,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (res.data) {
  //       console.log(res.data);
  //       emit("isLogged");
  //     }
  //   });
};
</script>
