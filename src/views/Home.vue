<template>
  <Dashboard v-if="store.isLogged" />
  <Login v-else />
</template>

<script lang="ts" setup>
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
