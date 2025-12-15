import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";

const LoginSchema = z.object({
  email: z.string().email("O email está inválido."),
  password: z.string().min(1, "A senha é obrigatória"),
});

const RegisterSchema = z
  .object({
    email: z.string().email("O email está inválido."),
    password: z
      .string()
      .min(8, "Sua senha é muito curta. Mínimo 8 caracteres.")
      .max(16, "Sua senha é muito longa. Máximo 16 caracteres.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A senha deve conter pelo menos um caractere especial"
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof RegisterSchema>;

export const RegisterAndLoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  const currentSchema = isRegistering ? RegisterSchema : LoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(currentSchema as any),
  });

  const { addToast } = useToast();
  const { mutate: mutateRegister } = useRegister(addToast);
  const { mutate: mutateLogin } = useLogin(addToast);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  function onSubmit(body: FormType) {
    const { confirmPassword, ...apiData } = body;

    if (isRegistering) {
      mutateRegister(apiData as any, {
        onSuccess: () => {
          toggleMode();
        }
      });
    } else {
      mutateLogin(apiData as any, {
        onSuccess: (response) => {
          authContext?.login(response.data?.access)
          navigate('/', {replace: true})
        },
      });
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    reset();
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-gblack flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-2xl border-cyan-secondary shadow-cyan-secondary flex flex-col p-4 min-w-[90vw] md:min-w-[50vw] gap-8"
        style={{ boxShadow: "0 4px 10px rgba(16, 185, 129, 0.5)" }}
      >
        <h2 className="bg-gradient-blue bg-clip-text text-transparent font-exo2 font-bold text-3xl">
          {isRegistering ? "Criar conta" : "Entrar na conta"}
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-[14px] text-white font-normal mb-1"
          >
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            placeholder="exemplo@gmail.com"
            className="border border-cyan-secondary rounded-md outline-none text-[16px] p-3 placeholder-cyan-secondary text-cyan-secondary focus:ring-2 focus:ring-cyan-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-[14px] text-white font-normal mb-1"
          >
            Senha
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="********"
            className="border border-cyan-secondary rounded-md outline-none text-[16px] p-3 placeholder-cyan-secondary text-cyan-secondary focus:ring-2 focus:ring-cyan-400 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {isRegistering && (
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-[14px] text-white font-normal mb-1"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="********"
              className="border border-cyan-secondary rounded-md outline-none text-[16px] p-3 placeholder-cyan-secondary text-cyan-secondary focus:ring-2 focus:ring-cyan-400 transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <button className="uppercase bg-pink-secondary text-[18px] font-inter font-bold text-white p-3 rounded-sm hover:bg-cyan-secondary transition-all ease-out duration-150 md:cursor-pointer">
          {isRegistering ? "Criar conta" : "Entrar"}
        </button>

        <div className="flex justify-center items-center">
          {isRegistering ? (
            <p className="text-[14px] text-white font-normal">
              Já tem uma conta?{" "}
              <span
                className="text-pink-secondary md:cursor-pointer"
                onClick={toggleMode}
              >
                Entrar
              </span>
              .
            </p>
          ) : (
            <p className="text-[14px] text-white font-normal">
              Não tem uma conta{" "}
              <span
                className="text-pink-secondary md:cursor-pointer"
                onClick={toggleMode}
              >
                Criar agora
              </span>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
