import { useRef, useState } from "react";
import type { DeckType } from "../subcategories";
import deleteIcon from "../../../assets/delete-icon.png";
import folderIcon from "../../../assets/folder-icon.png";
import bookIcon from "../../../assets/book-icon.png";
import rightIcon from "../../../assets/right-card-icon.png";
import leftIcon from "../../../assets/left-card-icon.png";
import { ModalDeleteSubCategoryComponent } from "./modal-delete-subcategory";
import { ModalDeleteDeckComponent } from "./modal-delete-deck";
import { useNavigate } from "react-router";

interface SubCategorySectionProps {
  name: string;
  decks: DeckType[];
  id: number;
}

export const SubCategorySection = ({
  name,
  decks,
  id,
}: SubCategorySectionProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showDeleteSubCategory, setShowDeleteSubCategory] = useState(false);

  const [showDeleteDeck, setShowDeleteDeck] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-4 md:px-0 md:max-w-[80vw] mx-auto">
      {/* 🔥 1 único modal, fora do map */}
      <ModalDeleteSubCategoryComponent
        setShowModal={setShowDeleteSubCategory}
        showModal={showDeleteSubCategory}
        id={id}
      />

      <ModalDeleteDeckComponent
        setShowModal={setShowDeleteDeck}
        showModal={showDeleteDeck}
        id={selectedDeckId ?? 0}
      />

      {/* HEADER */}
      <div className="flex justify-between items-center w-full md:w-[80vw] mx-auto">
        <div className="flex gap-2 md:gap-4 items-center">
          <img src={folderIcon} alt="Folder" className="h-6 md:h-auto" />
          <h3 className="bg-gradient-whcyan bg-clip-text text-transparent font-exo2 text-2xl md:text-4xl">
            {name}
          </h3>
        </div>

        <button
          onClick={() => setShowDeleteSubCategory(true)}
          className="scale-60 hover:scale-105 transition-transform ease-in duration-100 md:cursor-pointer"
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>

      {/* CARDS */}
      <div className="relative group w-full md:w-[80vw] mx-auto mt-6 md:mt-10">
        <button
          onClick={() => scroll("left")}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
        >
          <img src={leftIcon} alt="Scroll Left" className="w-6 h-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-4 md:gap-10 overflow-x-auto no-scrollbar flex-nowrap scroll-smooth py-2"
        >
          {Array.isArray(decks) &&
            decks.length > 0 &&
            decks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => navigate(`/categories/deck/${deck.id}`, { replace: true})}
                className="md:cursor-pointer hover:scale-105 transition-transform ease-in duration-100 flex items-center gap-2 justify-between w-[250px] md:w-[300px] p-4 md:p-6 px-6 md:px-10 border border-cyan-secondary rounded-2xl"
              >
                <div className="flex gap-3 md:gap-4 items-center">
                  <img
                    src={bookIcon}
                    alt="Book"
                    className="scale-75 md:scale-80"
                  />
                  <p className="bg-gradient-whcyan bg-clip-text text-transparent font-inter font-bold truncate text-sm md:text-base">
                    {deck.name}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedDeckId(deck.id);
                    setShowDeleteDeck(true);
                  }}
                  className="scale-60 hover:scale-70 transition-transform ease-in duration-100 md:cursor-pointer"
                >
                  <img src={deleteIcon} alt="Delete Deck" />
                </button>
              </div>
            ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
        >
          <img src={rightIcon} alt="Scroll Right" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
