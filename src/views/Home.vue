<template>
  <Dashboard v-if="logged" />
  <Login v-else @is-logged="logged = true" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

const logged = ref(false);
</script>
