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
      <p class="text-center mt-2">
        <router-link to="/signup" class="text-blue-darken-1"
          >SignUp</router-link
        >
      </p>
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
import { TodoItem } from "./types";

const emit = defineEmits(["isLogged"]);

const store = useAppStore();
const username = ref("");
const password = ref("");
const form = ref(null);

const isValid = computed(() => {
  return username.value.length > 0 && password.value.length > 0;
});

const login = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: username.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token && !store.isLogged) {
        store.token = res.token;
        store.isLogged = true;
        store.loginError = false;
        store.userName = "John Doe";
        localStorage.setItem("token", res.token);
        hydrateBucket();
        getUser();
      } else {
        store.loginError = true;
      }
    });
};

const hydrateBucket = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res: [TodoItem]) => {
      if (res.length) {
        store.bucket.push(...res);
      }
    })
    .catch((err) => console.log(err));
};

const getUser = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.userName = res.name;
      localStorage.setItem("userName", res.name);
    })
    .catch((err) => console.log(err));
};

/*
 *  If there is a token in Localstorage we try to retrieve the data and skip the login
 */

onBeforeMount(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  store.token = token;

  await hydrateBucket();

  if (store.bucket.length) {
    store.token = token;
    store.isLogged = true;
    store.userName = localStorage.getItem("userName") ?? "John Doe";
  }
});
</script>
