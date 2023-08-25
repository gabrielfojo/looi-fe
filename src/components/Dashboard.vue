<template lang="">
  <v-card max-width="448" class="mx-auto">
    <v-layout>
      <v-app-bar color="info">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Looi App</v-app-bar-title>

        <template v-slot:append>
          <v-btn> Add Todo <Dialog /></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-card
            border
            class="mb-2 mt-4"
            density="compact"
            :title="card.title"
            variant="text"
            v-for="card in toDoList"
            :key="card.id"
          >
            <v-card-text>
              {{ card.body }}
            </v-card-text>

            <template v-slot:actions>
              <v-btn color="primary" variant="text">Edit</v-btn>
              <v-btn color="primary" variant="text" @click="deleteTodo(card.id)"
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

type TodoItem = {
  id: string;
  title: string;
  body: string;
  tag: string;
};

const toDoList = ref(data);

const addTodo = () => {
  toDoList.value.push({
    id: "4",
    title: "Go to the supermarket and buy milk",
    body: "Lorem ipsum",
    tag: "important",
  });
};

const deleteTodo = (id: string) => {
  toDoList.value = toDoList.value.filter((el: TodoItem) => id !== el.id);
};
</script>
