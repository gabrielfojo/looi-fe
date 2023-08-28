<template lang="">
  <v-dialog v-model="dialog" activator="parent" width="auto">
    <v-card>
      <v-card-text>
        <v-sheet width="300" class="mx-auto">
          <v-form>
            <v-text-field v-model="title" label="Title" required></v-text-field>
            <v-textarea label="Body" v-model="body" required></v-textarea>
            <v-color-picker v-model="color" hide-inputs></v-color-picker>
            <v-btn color="secondary" class="mt-4" block @click="save">
              Save
            </v-btn>
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
import { TodoItem } from "./types";
import { CARD_DEFAULT_COLOR } from "./constants";

const props = defineProps({
  card: { type: Object, required: false },
});

const emit = defineEmits(["save"]);

onUpdated(() => {
  if (props.card) {
    title.value = props.card.title ?? "";
    body.value = props.card.body ?? "";
  }
});

const dialog = ref(false);
const title = ref("");
const body = ref("");
const color = ref(CARD_DEFAULT_COLOR);

const clearDialog = () => {
  title.value = "";
  body.value = "";
};

const closeDialog = () => {
  dialog.value = false;
};

const save = () => {
  const payload: TodoItem = {
    title: title.value,
    body: body.value,
    color: color.value,
  };

  if (props.card?.id) {
    payload["id"] = props.card.id;
  }

  emit("save", payload);

  clearDialog();
  closeDialog();
};
</script>
