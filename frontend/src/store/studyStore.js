import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const STUDIES_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/studies"
    : "/api/v1/studies";

export const useStudyStore = create((set) => ({
  studies: [],
  isLoading: false,
  error: null,
  message: null,
  fetchStudies: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(STUDIES_API_URL);
      set({ studies: response.data.studies, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  createStudy: async (title, content, category, tags) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${STUDIES_API_URL}/new-study`, {
        title,
        content,
        category,
        tags,
      });

      set({ isLoading: false, error: null });
      toast.success(response.data.message || "Estudo criado com sucesso");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao criar o estudo");
      set({ isLoading: false, error: error.response?.data?.message });
      throw error;
    }
  },

  fetchSingleStudy: async (id) => {
    try {
      const response = await axios.get(`${STUDIES_API_URL}/posted/${id}`);

      set({ study: response.data.study });
      return response.data.study;
    } catch (error) {
      set({ error: error.response?.data?.message || "Erro ao buscar estudo" });
      throw error;
    }
  },

  fetchUserStudies: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${STUDIES_API_URL}/user-studies`);
      set({ studies: response.data.userStudies, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar estudos do usuário:", error);
      set({
        error: error.response?.data?.message || "Erro ao buscar estudos",
        isLoading: false,
      });
    }
  },
}));
