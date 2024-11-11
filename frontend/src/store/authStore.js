import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const AUTH_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/auth"
    : "/api/v1/auth";

const USER_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/user"
    : "/api/v1/user";

const STUDIES_API_URL = "development"
  ? "http://localhost:5000/api/v1/studies"
  : "/api/v1/studies";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,
  message: null,

  signup: async (name, username, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, {
        name,
        username,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Erro ao criar a conta.");
      set({
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao fazer login. Tente novamente."
      );
      set({
        isLoading: false,
      });

      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${AUTH_API_URL}/logout`);

      localStorage.removeItem("user");

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erro ao tentar fazer logout.",
        isLoading: false,
      });
      throw error;
    }
  },

  authCheck: async () => {
    await new Promise((resolver) => setTimeout(resolver, 1000));
    set({ isCheckingAuth: true, error: null });

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        set({
          user: parsedUser,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        throw new Error("Usuário não encontrado.");
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
        error: null,
      });
    }
  },

  updateUserProfile: async (updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(`${USER_API_URL}/about-me`, updatedData);
      const updatedUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      set({
        user: updatedUser,
        isLoading: false,
        error: null,
      });

      toast.success(response.data.message || "Perfil atualizado com sucesso.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar o perfil."
      );

      throw error;
    }
  },
}));
