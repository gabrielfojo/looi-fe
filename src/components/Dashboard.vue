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
            v-for="card in toDoList"
            :key="card.id"
          >
            <v-card-text>
              {{ card.body }}
            </v-card-text>

            <template v-slot:actions>
              <v-btn
                color="secondary"
                size="small"
                variant="flat"
                prepend-icon="mdi-pencil-circle"
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
            </template>
          </v-card>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
import { data } from "@/assets/data.js";
import { ref } from "vue";

import Dialog from "@/components/Dialog.vue";
import Drawer from "@/components/Drawer.vue";
import { TodoItem } from "./types";

const toDoList = ref(data);
const drawer = ref(false);

// Methods

const addTodo = (payload: TodoItem) => {
  payload["id"] = Math.random().toString(36);
  toDoList.value.push(payload);
};

const deleteTodo = (id: string) => {
  toDoList.value = toDoList.value.filter((el: TodoItem) => id !== el.id);
};

const updateTodo = (payload: TodoItem) => {
  const key = toDoList.value.findIndex(
    (todo: TodoItem) => todo.id === payload.id
  );
  toDoList.value[key] = payload;
};
</script>
