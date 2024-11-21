import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const COMMENTS_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1/comments"
    : "/api/v1/comments";

export const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  fetchComments: async (studyId) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${COMMENTS_API_URL}/study/${studyId}/comments`
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
        `${COMMENTS_API_URL}/study/${studyId}/new-comment`,
        commentData
      );
      set((state) => ({
        comments: [response.data, ...state.comments],
      }));
      toast.success(
        response.data.message || "Comentário adicionado com sucesso."
      );
    } catch (error) {
      toast.error(
        response.data.message ||
          "Erro ao adicionar comentário. Tente mais tarde."
      );
      console.error("Erro ao adicionar comentário:", error);
    }
  },

  deleteComment: async (commentId) => {
    try {
      const response = await axios.delete(
        `${COMMENTS_API_URL}/comment/${commentId}`
      );
      set((state) => ({
        comments: state.comments.filter((comment) => comment._id !== commentId),
      }));
      toast.success(
        response.data.message || "Comentário excluído com sucesso."
      );
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      toast.error(
        error.response?.data?.message ||
          "Erro ao excluir comentário. Tente mais tarde."
      );
    }
  },
}));
