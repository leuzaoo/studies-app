import { create } from "zustand";
import axios from "axios";

export const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  fetchComments: async (studyId) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `/api/v1/comments/study/${studyId}/comments`
      );
      set({ comments: response.data, loading: false });
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      set({ loading: false });
    }
  },

  addComment: async (studyId, commentData) => {
    try {
      const response = await axios.post(
        `/studies/${studyId}/comment`,
        commentData
      );
      set((state) => ({
        comments: [response.data, ...state.comments],
      }));
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  },
}));
