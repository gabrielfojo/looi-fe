// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const token = ref(null);
  const isLogged = ref(false);
  const loginError = ref(false);

  const bucket = ref([]);

  function logout() {
    isLogged.value = false;
    token.value = null;
    localStorage.clear();
  }

  return { token, isLogged, loginError, logout };
});
