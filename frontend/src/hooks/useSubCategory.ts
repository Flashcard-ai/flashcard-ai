import { useMutation, useQuery } from "@tanstack/react-query";
import getAPI from "../api/api";
import type { SubCategoriesType } from "../pages/subcategories/subcategories";
import type { ToastTypes } from "../context/toast-context";

export const useCreateSubCategory = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("subcategories/", body);
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

export const useDeleteSubCategory = (
  addToast: (msg: string, type: ToastTypes) => void
) => {
  return useMutation({
    mutationFn: (id: number) => {
      return getAPI().delete(`subcategories/${id}/`);
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

export const useSubCategories = () => {
  return useQuery({
    queryKey: ["get-all-subcategories"],
    queryFn: () => getAPI().get<SubCategoriesType[]>("subcategories/"),
  });
};
