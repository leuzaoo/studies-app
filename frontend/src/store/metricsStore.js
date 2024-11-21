import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const METRICS_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/metrics"
    : "/api/v1/metrics";

const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  toast.error(errorMessage);
  console.error(errorMessage);
  return errorMessage;
};

export const useMetricsStore = create((set) => ({
  metrics: {},
  isLoading: false,
  error: null,

  fetchSingleUserStudiesCount: async () => {
    set({ isLoading: true, error: null });

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `${METRICS_API_URL}/${user._id}/studies-count`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(
        error,
        "Erro ao buscar número de comentários"
      );
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  fetchSingleStudyCommentsCount: async (studyId) => {
    try {
      const response = await axios.get(
        `${METRICS_API_URL}/${studyId}/comments-count`
      );
      set((state) => ({
        metrics: {
          ...state.metrics,
          [studyId]: {
            ...state.metrics[studyId],
            comments: response.data.count,
          },
        },
      }));
      return response.data.count;
    } catch (error) {
      const errorMessage = handleApiError(
        error,
        "Erro ao buscar número de comentários"
      );
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
}));
