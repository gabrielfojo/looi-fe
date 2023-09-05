<template lang="">
  <v-navigation-drawer permanent location="left" v-model="props.drawer">
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        :title="store.userName"
        subtitle="Logged in"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        value="account"
        @click="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/app";

const props = defineProps(["drawer"]);
const store = useAppStore();

const logout = function () {
  store.logout();
};
</script>
