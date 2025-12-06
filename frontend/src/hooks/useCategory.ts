import { useMutation, useQuery } from "@tanstack/react-query";
import getAPI from "../api/api";
import type { ToastTypes } from "../context/toast-context";

export const useCreateCategory = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("categories/", body);
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

export const useDeleteCategory = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (id: number) => {
      return getAPI().delete(`categories/${id}/`);
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

export type CategoryType = {
  id: number;
  owner: number;
  name: string;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => {
      return getAPI().get<CategoryType[]>("categories/");
    },
  });
};
