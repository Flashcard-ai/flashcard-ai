import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateCategory,
  type CategoryType,
} from "../../../hooks/useCategory";
import { useToast } from "../../../hooks/useToast";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useQueryClient } from "@tanstack/react-query";

interface ModalCreateCategoryProps {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  categories: CategoryType[];
}

export const ModalCreateCategoryComponent = ({
  showModal,
  setShowModal,
  categories = [],
}: ModalCreateCategoryProps) => {
  const modalSchema = z.object({
    name: z
      .string()
      .min(3, "Nome muito curto. Mínimo 3 caracteres")
      .max(12, "Nome muito grande. Máximo 12 caracteres")
      .refine(
        (val) =>
          !categories.some(
            (cat) => cat.name.toLowerCase() === val.toLowerCase()
          ),
        { message: "Nome já existe!" }
      ),
  });

  type ModalType = z.infer<typeof modalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(modalSchema),
  });

  const { addToast } = useToast();
  const authContext = useContext(AuthContext);
  const { mutate: mutateCreateCategory } = useCreateCategory(
    addToast,
  );
  const queryClient = useQueryClient();

  const createCategory = (data: ModalType) => {
    mutateCreateCategory(data, {
      onSuccess: () => {
        setShowModal(!showModal);
        queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      },
    });
  };

  return (
    <>
      {!showModal ? (
        ""
      ) : (
        <div className="absolute z-10 top-0 left-0 w-screen min-h-screen bg-black/40">
          <div className="absolute z-20 top-[50%] left-[50%] w-[90vw] md:w-[70vw] lg:w-[40vw] max-h-[50vh] transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-cyan-secondary border-2 rounded-2xl flex flex-col gap-6 p-4">
            <div>
              <h4 className="font-exo2 font-bold bg-gradient-blue text-transparent bg-clip-text text-3xl">
                Nova categoria
              </h4>
              <p className="font-inter text-cyan-secondary">
                Digite o nome da nova categoria
              </p>
            </div>
            <form
              onSubmit={handleSubmit(createCategory)}
              className="flex flex-col gap-6"
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nome da categoria"
                  className="bg-transparent w-full border-cyan-secondary border rounded-2xl outline placeholder:text-cyan-secondary text-cyan-secondary p-3 text-[14px]"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 pl-2 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  className="bg-transparent border border-gray-500 md:cursor-pointer text-gray-500 rounded-2xl p-2 text-[14px] font-inter transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  onClick={() => {
                    setShowModal(!showModal);
                    reset();
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-gradient-blue md:cursor-pointer text-gray-950 rounded-2xl p-2 px-4 text-[14px] font-inter transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
