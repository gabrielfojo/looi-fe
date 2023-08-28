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
    <v-alert
      v-if="store.loginError"
      class="mt-4"
      type="error"
      title="Error"
      text="Try again!"
    ></v-alert>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import { useAppStore } from "@/store/app";

const emit = defineEmits(["isLogged"]);

const store = useAppStore();
const username = ref("");
const password = ref("");
const form = ref(null);

const isValid = computed(() => {
  return username.value.length > 0 && password.value.length > 0;
});

const login = async () => {
  // POST LOGIN

  fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: import.meta.env.VITE_API_USER,
      password: import.meta.env.VITE_API_PASS,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        store.token = res.data;
        store.isLogged = true;
        store.loginError = false;
        localStorage.setItem("token", res.data.token);
      } else {
        store.loginError = true;
      }
    });
};

/*
 *  If there is a token in Localstorage we try to retrieve the data and skip the login
 */

onBeforeMount(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  fetch(import.meta.env.VITE_API_DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      //== @TODO check Health
      if (res && res.hm3_plans) {
        store.isLogged = true;
      }
    });
});
</script>
