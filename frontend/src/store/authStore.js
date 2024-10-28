import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isChecking: true,
  isLoading: false,
  error: null,
  message: null,

  signup: async (name, username, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/signup`, {
        name,
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        message: response.data.message,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Erro ao criar a conta.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
