import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const STUDIES_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/studies"
    : "/api/v1/studies";

const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  toast.error(errorMessage);
  console.error(errorMessage);
  return errorMessage;
};

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
      const errorMessage = handleApiError(error, "Erro ao buscar estudos");
      set({ error: errorMessage, isLoading: false });
    }
  },

  createStudy: async (title, description, content, category, tags) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${STUDIES_API_URL}/new-study`, {
        title,
        description,
        content,
        category,
        tags,
      });
      set({ isLoading: false });
      toast.success(response.data.message || "Estudo criado com sucesso");
    } catch (error) {
      const errorMessage = handleApiError(error, "Erro ao criar o estudo");
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchSingleStudy: async (id) => {
    try {
      const response = await axios.get(`${STUDIES_API_URL}/posted/${id}`);
      // set({ study: response.data.study });
      return response.data.study;
    } catch (error) {
      const errorMessage = handleApiError(error, "Erro ao buscar estudo");
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  fetchUserStudies: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${STUDIES_API_URL}/user-studies`);
      set({ studies: response.data.userStudies, isLoading: false });
    } catch (error) {
      const errorMessage = handleApiError(
        error,
        "Erro ao buscar estudos do usuário"
      );
      set({ error: errorMessage, isLoading: false });
    }
  },

  updateStudy: async (id, updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(
        `${STUDIES_API_URL}/posted/edit/${id}`,
        updatedData
      );

      set((state) => ({
        studies: state.studies.map((study) =>
          study._id === id ? { ...study, ...updatedData } : study
        ),
        isLoading: false,
      }));

      toast.success(response.data.message || "Estudo atualizado com sucesso");
    } catch (error) {
      const errorMessage = handleApiError(error, "Erro ao atualizar o estudo");
      set({ error: errorMessage });
    }
  },

  deleteStudy: async (id) => {
    try {
      const response = await axios.delete(`${STUDIES_API_URL}/${id}`);
      toast.success(response.data.message || "Estudo excluído com sucesso");
    } catch (error) {
      const errorMessage = handleApiError(error, "Erro ao excluir o estudo");
      set({ error: errorMessage });
    }
  },
}));
