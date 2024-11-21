import { create } from "zustand";
import axios from "axios";

const METRICS_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/metrics"
    : "/api/v1/metrics";

export const useMetricsStore = create((set) => ({
  isLoading: false,
  error: null,

  fetchUserStudiesCount: async () => {
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
      set({ isLoading: false });
      throw error;
    }
  },
}));
