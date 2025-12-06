import iconFolder from "../../../assets/folder-icon.png";
import iconDelete from "../../../assets/delete-icon.png";
import { ModalCreateCategoryComponent } from "./modal-create-category";
import { useState } from "react";
import type { CategoryType } from "../../../hooks/useCategory";
import { ModalDeleteCategoryComponent } from "./modal-delete-category";

interface CardInterface {
  newCategory: boolean;
  title: string;
  id: number;
  categories: CategoryType[];
}

export const CardComponent = ({
  newCategory,
  title,
  id,
  categories = [],
}: CardInterface) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div
      className={`flex flex-col flex-1 min-w-[300px] max-w-[400px] border-cyan-800 border-2 rounded-3xl ${
        newCategory
          ? "bg-cyan-300/20 pb-8 justify-center items-center"
          : "justify-between p-8"
      }`}
    >
      <ModalCreateCategoryComponent
        showModal={showModal}
        setShowModal={setShowModal}
        categories={categories}
      />

      <ModalDeleteCategoryComponent
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        id={id}
      />
      {newCategory ? (
        <button
          onClick={() => setShowModal(!showModal)}
          className="md:cursor-pointer hover:scale-110 transition-transform ease-in duration-150"
        >
          <p className="font-inter font-extralight text-8xl text-cyan-secondary">
            +
          </p>
          <p className="font-inter font-bold text-2xl text-cyan-secondary">
            Nova Categoria
          </p>
        </button>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <img src={iconFolder} className="w-[22px] h-[22px]" />
            <h6 className="bg-gradient-whcyan bg-clip-text text-transparent text-[22px] max-w-[200px] truncate">
              {title}
            </h6>
          </div>

          <button className="w-[22px] h-[22px] relative left-[95%] md:cursor-pointer hover:scale-110 transition-all ease-in duration-150" onClick={() => setShowModalDelete(!showModalDelete)}>
            <img src={iconDelete} className="w-[22px] h-[22px]" />
          </button>
        </>
      )}
    </div>
  );
};
