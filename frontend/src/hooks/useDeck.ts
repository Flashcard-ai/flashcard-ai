import { useMutation } from "@tanstack/react-query";
import getAPI from "../api/api";
import type { ToastTypes } from "../context/toast-context";

export const useCreateDeck = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (body: any) => {
        console.log(body)
      return getAPI().post("decks/", body);
    },
    onMutate: () => {
      addToast("Criando...", "info");
    },
    onSuccess: () => {
      addToast("Criado com sucesso", "success");
    },
    onError: () => {
      addToast("Não foi possivel criar.", "error");
    },
  });
};

export const useDeleteDeck= (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (id: number) => {
      return getAPI().delete(`decks/${id}/`);
    },
    onMutate: () => {
      addToast("Deletando...", "info");
    },
    onSuccess: () => {
      addToast("Deletado com sucesso", "success");
    },
    onError: () => {
      addToast("Não foi possivel deletar.", "error");
    },
  });
};