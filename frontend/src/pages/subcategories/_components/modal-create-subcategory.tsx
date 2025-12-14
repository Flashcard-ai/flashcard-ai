import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import type { SubCategoriesType } from "../subcategories";
import { useCreateSubCategory } from "../../../hooks/useSubCategory";

interface ModalCreateCategoryProps {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  id: number;
  subcategories: SubCategoriesType[];
}

export const ModalCreateSubCategoryComponent = ({
  showModal,
  setShowModal,
  id,
  subcategories = []
}: ModalCreateCategoryProps) => {
  const modalSchema = z.object({
    name: z
      .string()
      .min(3, "Nome muito curto")
      .max(12, "Nome muito longo")
      .refine(
        (value) =>
          !subcategories.some(
            (cat) => cat.name.toLowerCase() === value.toLowerCase()
          ),
        "Nome inválido ou já existente!"
      )
  });

  type ModalType = z.infer<typeof modalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ModalType>({
    resolver: zodResolver(modalSchema)
  });

  const { addToast } = useToast();
  const { mutate: mutateCreateCategory } = useCreateSubCategory(addToast);
  const queryClient = useQueryClient();

  const createSubCategory = ({ name }: ModalType) => {
    reset();
    mutateCreateCategory(
      { category_id: id, name },
      {
        onSuccess: () => {
          setShowModal(!showModal);
          queryClient.invalidateQueries({
            queryKey: ["get-all-subcategories"]
          });
        }
      }
    );
  };

  if (!showModal) return null;

  return (
    <div className="absolute z-10 top-0 left-0 w-screen min-h-screen bg-black/40">
      <div className="absolute z-20 top-[50%] left-[50%] w-[90vw] md:w-[70vw] lg:w-[40vw] max-h-[60vh] transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-cyan-secondary border-2 rounded-2xl flex flex-col gap-6 p-4 overflow-y-auto no-scrollbar">
        <div>
          <h4 className="font-exo2 font-bold bg-gradient-blue text-transparent bg-clip-text text-3xl">
            Nova subcategoria
          </h4>
          <p className="font-inter text-cyan-secondary">
            Digite o nome da nova subcategoria
          </p>
        </div>

        <form
          onSubmit={handleSubmit(createSubCategory)}
          className="flex flex-col gap-6"
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="Nome da subcategoria"
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
              className="bg-transparent border border-gray-500 md:cursor-pointer text-gray-500 rounded-2xl p-2 text-[14px] font-inter transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-105"
              onClick={() => {
                setShowModal(!showModal);
                reset();
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-gradient-blue md:cursor-pointer text-gray-950 rounded-2xl p-2 px-4 text-[14px] font-inter transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
