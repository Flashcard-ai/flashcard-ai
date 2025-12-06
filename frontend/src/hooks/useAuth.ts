import getAPI from "../api/api";
import { useMutation } from "@tanstack/react-query";
import type { ToastTypes } from "../context/toast-context";

export const useRegister = (addToast: (msg: string, type: ToastTypes) => void) => {
  return useMutation({
    mutationFn: (body: any) => getAPI().post("accounts/signup/", body),
    onMutate: () => addToast("Registrando...", "info"),
    onSuccess: () => addToast("Conta criada com sucesso!", "success"),
    onError: () => addToast("Não foi possivel criar a conta!", "error"),
  });
};

export const useLogin = ( addToast: (msg: string, type: ToastTypes) => void) => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("accounts/login/", body);
    },
    onMutate: () => addToast("Logando...", "info"),
    onSuccess: () => addToast("Login realizado com sucesso! ", "success"),
    onError: () => addToast("Não foi possivel realizar o login!", "error")
  });
};
