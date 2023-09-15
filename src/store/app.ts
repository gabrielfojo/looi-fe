// Utilities
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TodoItem } from "@/components/types";

export const useAppStore = defineStore("app", () => {
  const token: Ref<string | null> = ref(null);
  const isLogged: Ref<boolean> = ref(false);
  const userName: Ref<string> = ref("");

  const bucket: any = ref([]);

  function logout() {
    $reset();
    localStorage.clear();
  }

  function $reset() {
    token.value = null;
    isLogged.value = false;
    userName.value = "";
    bucket.value = [];
  }

  async function addTodo(payload: TodoItem) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const created = await res.json();
      bucket.value.push(created);
    }

    return { statusOk: res.ok };
  }

  async function deleteTodo(id: number) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (res.ok) {
      bucket.value = bucket.value.filter((el: TodoItem) => el.id !== id);
    }

    return { statusOk: res.ok };
  }

  async function updateTodo(payload: TodoItem) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/todo/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      const key = bucket.value.findIndex(
        (el: TodoItem) => el.id === payload.id
      );
      bucket.value[key] = payload;
    }

    return { statusOk: res.ok };
  }

  return {
    addTodo,
    bucket,
    deleteTodo,
    isLogged,
    logout,
    token,
    updateTodo,
    userName,
  };
});
