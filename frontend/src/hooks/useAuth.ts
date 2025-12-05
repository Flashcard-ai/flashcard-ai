import getAPI from "../api/api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("accounts/signup/", body);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: any) => {
      return getAPI().post("accounts/login/", body);
    },
  });
};
