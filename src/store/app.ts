// Utilities
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TodoItem } from "@/components/types";

export const useAppStore = defineStore("app", () => {
  const token: Ref<string | null> = ref(null);
  const isLogged: Ref<boolean> = ref(false);
  const loginError: Ref<boolean> = ref(false);
  const userName: Ref<string> = ref("");

  const bucket: any = ref([]);

  function logout() {
    $reset();
    localStorage.clear();
  }

  function $reset() {
    token.value = null;
    isLogged.value = false;
    loginError.value = false;
    userName.value = "";
    bucket.value = [];
  }

  async function addTodo(payload: TodoItem) {
    await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        bucket.value = [...bucket.value, payload];
      })
      .catch((e) => console.log);
  }

  async function deleteTodo(id: number) {
    await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        bucket.value = bucket.value.filter((el: TodoItem) => el.id !== id);
      })
      .catch((e) => console.log);
  }

  async function updateTodo(payload: TodoItem) {
    await fetch(`${import.meta.env.VITE_API_URL}/todo/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        const key = bucket.value.findIndex(
          (el: TodoItem) => el.id === payload.id
        );
        bucket.value[key] = payload;
      })
      .catch((e) => console.log);
  }

  return {
    addTodo,
    bucket,
    deleteTodo,
    isLogged,
    loginError,
    logout,
    token,
    updateTodo,
    userName,
  };
});
