import { useMutation } from "@tanstack/react-query";
import type { ToastTypes } from "../context/toast-context";
import getAPI from "../api/api";

export const useCreateCard = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("cards/", body);
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

export const useCreateCardIA = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("cards/ai/", body);
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

export const useDeleteCard = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (id: number) => {
      return getAPI().delete(`cards/${id}/`);
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
