import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import type { SubCategoriesType } from "../subcategories";
import { useCreateDeck } from "../../../hooks/useDeck";

interface ModalCreateDeckProps {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  subcategories: SubCategoriesType[];
  categoryId: number;
}

export const ModalCreateDeckComponent = ({
  showModal,
  setShowModal,
  subcategories = [],
  categoryId,
}: ModalCreateDeckProps) => {
  const modalSchema = z.object({
    name: z
      .string()
      .min(3, "Nome muito curto. Mínimo 3 caracteres")
      .max(20, "Nome muito grande. Máximo 20 caracteres"),
    subcategory_id: z
      .number()
      .refine((id) => subcategories.some((sub) => sub.id === id), {
        message: "Selecione uma subcategoria válida",
      }),
  });

  type ModalType = z.infer<typeof modalSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModalType>({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      subcategory_id: undefined,
    },
  });

  const { addToast } = useToast();
  const { mutate: mutateCreateDeck } = useCreateDeck(addToast);
  const queryClient = useQueryClient();

  const createDeck = ({ name, subcategory_id }: ModalType) => {
    reset();

    mutateCreateDeck(
      { category_id: categoryId, subcategory_id, name },
      {
        onSuccess: () => {
          setShowModal(false);
          queryClient.invalidateQueries({
            queryKey: ["get-all-subcategories"],
          });
        },
      }
    );
  };

  return (
    <>
      {!showModal ? null : (
        <div className="absolute z-10 top-0 left-0 w-screen min-h-screen bg-black/40">
          <div className="absolute z-20 top-[50%] left-[50%] w-[90vw] md:w-[70vw] lg:w-[40vw] max-h-[60vh] transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-cyan-secondary border-2 rounded-2xl flex flex-col gap-6 p-4 overflow-y-auto">
            <div>
              <h4 className="font-exo2 font-bold bg-gradient-blue text-transparent bg-clip-text text-3xl">
                Novo Deck
              </h4>
              <p className="font-inter text-cyan-secondary">
                Crie um deck e escolha uma subcategoria
              </p>
            </div>

            <form
              onSubmit={handleSubmit(createDeck)}
              className="flex flex-col gap-6"
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nome do deck"
                  className="bg-transparent w-full border-cyan-secondary border rounded-2xl outline placeholder:text-cyan-secondary text-cyan-secondary p-3 text-[14px]"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 pl-2 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-cyan-secondary font-inter text-sm">
                  Selecione a subcategoria
                </p>

                <select
                  {...register("subcategory_id", { valueAsNumber: true })}
                  className="bg-transparent border border-cyan-secondary rounded-2xl text-cyan-secondary p-3 outline-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-900">
                    Escolha uma subcategoria
                  </option>

                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id} className="text-black">
                      {sub.name}
                    </option>
                  ))}
                </select>

                {errors.subcategory_id && (
                  <p className="text-red-500 pl-2 text-sm">
                    {errors.subcategory_id.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  className="bg-transparent border border-gray-500 text-gray-500 rounded-2xl p-2 text-[14px] font-inter hover:bg-gray-500 hover:text-white hover:scale-105 transition-all md:cursor-pointer"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-gradient-blue text-gray-950 rounded-2xl p-2 px-4 text-[14px] font-inter hover:scale-105 hover:brightness-110 transition-all md:cursor-pointer"
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
