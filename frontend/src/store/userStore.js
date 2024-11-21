import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const USER_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/user"
    : "/api/v1/user";

export const useUserStore = create((set) => ({
  isLoading: false,
  error: null,
  message: null,

  updateUserProfile: async (updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(`${USER_API_URL}/settings`, updatedData);
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

  fetchUserProfile: async (username) => {
    try {
      const response = await axios.get(`${USER_API_URL}/${username}`);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },
}));
