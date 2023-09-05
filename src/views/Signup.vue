<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent ref="form">
      <v-text-field
        v-model="name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" @click="save" :disabled="!isValid"
        >Save</v-btn
      >
      <v-btn
        type="button"
        block
        class="mt-2"
        @click="router.push('/')"
        v-if="alert.ok"
        >Login</v-btn
      >
    </v-form>
    <v-alert
      v-if="alert.show && !isTyping"
      :type="alert.ok ? 'success' : 'error'"
      class="mt-4"
      :title="alert.msg"
    ></v-alert>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAppStore } from "@/store/app";
import router from "@/router";

const store = useAppStore();

const name = ref("");
const email = ref("");
const password = ref("");
const alert = ref({ show: false, msg: "", ok: false });

const isValid = computed(() => {
  return (
    name.value.length > 0 && password.value.length > 0 && email.value.length > 0
  );
});

const isTyping = computed(() => {
  return (
    name.value.length ||
    (0 && password.value.length) ||
    (0 && email.value.length > 0)
  );
});

const save = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  }).then((res) => {
    alert.value.show = true;
    alert.value.ok = res.ok;
    alert.value.msg = res.statusText;

    name.value = "";
    email.value = "";
    password.value = "";
  });
};
</script>
