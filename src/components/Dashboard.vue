<template lang="">
  <v-card max-width="50%" class="mx-auto">
    <v-layout>
      <v-app-bar color="info">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Looi App</v-app-bar-title>
        <template v-slot:append>
          <v-btn> Add Todo <Dialog @save="addTodo" /></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <Drawer :drawer="drawer" />
          <v-card
            border
            class="mb-2 mt-4"
            density="compact"
            :style="{ backgroundColor: card.color ?? '#FFF' }"
            :title="card.title"
            variant="text"
            v-for="card in store.bucket"
            :key="card.id"
          >
            <v-card-text
              :class="card.done ? 'text-decoration-line-through' : ''"
            >
              {{ card.body }}
            </v-card-text>

            <template v-slot:actions>
              <v-btn
                color="secondary"
                size="small"
                variant="flat"
                prepend-icon="mdi-pencil-circle"
                :disabled="!!card.done"
                >Edit <Dialog :card="{ ...card }" @save="updateTodo"
              /></v-btn>
              <v-btn
                color="secondary"
                variant="flat"
                size="small"
                prepend-icon="mdi-delete-circle"
                @click="deleteTodo(card.id)"
                >Delete</v-btn
              >
              <v-btn
                color="secondary"
                variant="flat"
                size="small"
                prepend-icon="mdi-delete-circle"
                @click="archiveTodo(card)"
                >{{ card.done ? "Undo" : "Done" }}</v-btn
              >
            </template>
          </v-card>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import Dialog from "@/components/Dialog.vue";
import Drawer from "@/components/Drawer.vue";
import { TodoItem } from "./types";
import { useAppStore } from "@/store/app";

const drawer = ref(false);
const store = useAppStore();

// Methods

const addTodo = (payload: TodoItem) => {
  store.addTodo(payload);
};

const deleteTodo = (id: number) => {
  store.deleteTodo(id);
};

const updateTodo = (payload: TodoItem) => {
  store.updateTodo(payload);
};

const archiveTodo = (payload: TodoItem) => {
  payload.done = !payload.done;
  store.updateTodo(payload);
};
</script>
