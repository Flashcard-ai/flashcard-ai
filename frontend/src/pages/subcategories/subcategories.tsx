import { useEffect, useState } from "react";
import { ReturnButton } from "../../components/return-button";
import { ModalCreateSubCategoryComponent } from "./_components/modal-create-subcategory";
import { SubCategorySection } from "./_components/subcategory-section";
import { useSubCategories } from "../../hooks/useSubCategory";
import { useNavigate, useParams } from "react-router";
import { useCategory } from "../../hooks/useCategory";
import { ModalCreateDeckComponent } from "./_components/modal-create-deck";

export type DeckType = {
  category_id: number;
  subcategory_id: number;
  id: number;
  name: string;
};

export type SubCategoriesType = {
  id: number;
  name: string;
  decks: DeckType[];
};

export const SubCategoriesPage = () => {
  const { id } = useParams();
  const [showCreateSubCategory, setShowCreateSubCategory] = useState(false);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const { data: dataSubcategories } = useSubCategories();

  const navigate = useNavigate();
  const categoryId = Number(id);

  const { data: dataCategoryId, error, isError } = useCategory(categoryId);

  useEffect(() => {
    if (isNaN(categoryId)) {
      navigate("/");
      return;
    }

    if (isError || error) {
      navigate("/");
      return;
    }
  }, [categoryId, isError, error, navigate]);

  return (
    <div className="w-full min-h-screen bg-gradient-gblack flex flex-col p-4 md:p-8">
      <ModalCreateSubCategoryComponent
        showModal={showCreateSubCategory}
        setShowModal={setShowCreateSubCategory}
        id={categoryId}
        subcategories={dataSubcategories?.data || []}
      />

      <ModalCreateDeckComponent
        showModal={showCreateDeck}
        setShowModal={setShowCreateDeck}
        subcategories={dataSubcategories?.data || []}
        categoryId={categoryId}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <ReturnButton to="/" />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-3xl md:text-5xl font-bold font-exo2 bg-gradient-blue bg-clip-text text-transparent leading-tight">
              {dataCategoryId?.data.name}
            </h1>
            <h6 className="text-cyan-secondary text-sm font-inter font-medium tracking-wide">
              Gerencie seus Decks
            </h6>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex gap-3 w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={() => {
              setShowCreateSubCategory(true);
            }}
            className="md:cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-inter text-sm font-medium backdrop-blur-sm active:scale-95"
          >
            Nova subcategoria
          </button>

          <button
            onClick={() => setShowCreateDeck(true)}
            className="md:cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-blue text-white font-inter text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity active:scale-95"
          >
            Novo deck
          </button>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-10 justify-center items-center pb-10cd  max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] overflow-y-auto no-scrollbar">
        {(dataSubcategories?.data ?? []).map((sub) => (
          <SubCategorySection
            key={sub.id}
            name={sub.name}
            decks={sub.decks}
            id={sub.id}
          />
        ))}
      </div>
    </div>
  );
};
