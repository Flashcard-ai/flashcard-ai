import { useToast } from "../../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteSubCategory } from "../../../hooks/useSubCategory";

interface ModalDeleteSubCategoryProps {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  id: number;
}

export const ModalDeleteSubCategoryComponent = ({
  showModal,
  setShowModal,
  id,
}: ModalDeleteSubCategoryProps) => {
  const { addToast } = useToast();
  const { mutate: mutateDeleteSubCategory } = useDeleteSubCategory(addToast);
  const queryClient = useQueryClient();

  const deleteCategory = () => {
    mutateDeleteSubCategory(id, {
      onSuccess: () => {
        setShowModal(!showModal);
        queryClient.invalidateQueries({ queryKey: ["get-all-subcategories"] });
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
                Deletar subcategoria
              </h4>
              <p className="font-inter text-cyan-secondary">
                Tem certeza que deseja deletar?
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                className="bg-transparent border border-gray-500 md:cursor-pointer text-gray-500 rounded-2xl p-2 text-[14px] font-inter transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Cancelar
              </button>

              <button
                onClick={deleteCategory}
                className="bg-gradient-blue md:cursor-pointer text-gray-950 rounded-2xl p-2 px-4 text-[14px] font-inter transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
