import { useEffect, useState } from "react";
import { ReturnButton } from "../../components/return-button";
import { motion } from "framer-motion";
import saveIcon from "../../assets/save-icon.png";
import genIcon from "../../assets/gen-icon.png";
import eyeIcon from "../../assets/eyes-icon.png";
import { CardCardsComponent } from "./_components/card-cards";
import { ModalGenerateCardIAComponent } from "./_components/moral-generate-card-ia";
import { useNavigate, useParams } from "react-router";
import { useDeck } from "../../hooks/useDeck";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCard, useCreateCardIA } from "../../hooks/useCard";
import { useToast } from "../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

export type Side = "front" | "back";

type DeckType = {
  id: number;
  category_id: number;
  subcategory_id: number;
  name: string;
};

type CardType = {
  id: number;
  category_id: number;
  subcategory_id: number;
  deck_id: number;
  question: string;
  answer: string;
};

export type DeckResponse = {
  deck: DeckType;
  cards: CardType[];
};

export const CardsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [side, setSide] = useState<Side>("front");
  const [showGenerate, setGenerate] = useState(false);

  const deckId = Number(id);

  const { data: dataDeck, error, isError } = useDeck(deckId);

  const cardSchema = z.object({
    question: z
      .string()
      .min(3, "A frente do card deve ter no mínimo 3 caracteres")
      .max(500, "A frente do card é muito longa"),
    answer: z
      .string()
      .min(3, "O verso do card deve ter no mínimo 3 caracteres")
      .max(500, "O verso do card é muito longo"),
  });

  type CardFormType = z.infer<typeof cardSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CardFormType>({
    resolver: zodResolver(cardSchema),
  });

  const { addToast } = useToast();
  const { mutate: mutateCreateCard } = useCreateCard(addToast);
  const { mutate: mutateCreateCardIA } = useCreateCardIA(addToast);
  const queryClient = useQueryClient();

  const handleCreateCard = (data: CardFormType) => {
    const obj = {
      category_id: dataDeck?.data.deck.category_id,
      subcategory_id: dataDeck?.data.deck.subcategory_id,
      deck_id: deckId,
      question: data.question,
      answer: data.answer,
    };

    mutateCreateCard(obj, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-decks"] });
        reset();
        setValue("question", "");
        setValue("answer", "");
        setSide("front");
      },
    });
  };

  const handleCreateCardIA = (prompt: string, url: string) => {
    const obj = {
      category_id: dataDeck?.data.deck.category_id,
      subcategory_id: dataDeck?.data.deck.subcategory_id,
      deck_id: deckId,
      url: url,
      prompt: prompt,
    };

    mutateCreateCardIA(obj, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-decks"] });
      },
    });
  };

  useEffect(() => {
    if (isNaN(deckId)) {
      navigate(-1);
      return;
    }

    if (isError || error) {
      navigate(-1);
      return;
    }
  }, [deckId, isError, error, navigate]);

  return (
    <div className="w-full min-h-screen bg-gradient-gblack flex flex-col gap-6 p-4 sm:p-6 md:p-8">
      <ModalGenerateCardIAComponent
        setShowModal={setGenerate}
        showModal={showGenerate}
        handleCreateCardIA={handleCreateCardIA}
      />

      <header className="flex items-center gap-4">
        <ReturnButton to={`/categories/${dataDeck?.data.deck.id}`} />

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-exo2 bg-gradient-blue bg-clip-text text-transparent">
            {dataDeck?.data.deck.name}
          </h1>
          <span className="text-cyan-secondary text-xs sm:text-sm font-inter font-medium">
            Gerencie seus cards
          </span>
        </div>
      </header>

      <main className="flex flex-col items-center gap-6 w-full">
        <section className="w-full max-w-md sm:max-w-xl lg:max-w-3xl flex flex-col gap-6 border border-cyan-200 rounded-lg p-4 sm:p-6">
          <h4 className="text-cyan-secondary font-exo2 font-bold text-xl sm:text-2xl md:text-3xl">
            Criar card
          </h4>

          <div className="relative w-full h-48 sm:h-56 md:h-64 perspective-[1200px] my-2">
            <motion.div
              animate={{ rotateY: side === "front" ? 0 : 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <textarea
                  {...register("question")}
                  placeholder="Seu card (frente)"
                  className="w-full h-full resize-none outline-none border border-cyan-200 rounded-md p-4 text-sm sm:text-base text-white placeholder:text-white bg-transparent text-center"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.question.message}
                  </p>
                )}
              </div>

              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <textarea
                  {...register("answer")}
                  placeholder="Seu card (verso)"
                  className="w-full h-full resize-none outline-none border border-cyan-200 rounded-md p-4 text-sm sm:text-base text-white placeholder:text-white bg-transparent text-center"
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.answer.message}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => setSide(side === "front" ? "back" : "front")}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-inter text-sm font-medium backdrop-blur-sm hover:bg-white/10 active:scale-95 transition"
            >
              Virar card
            </button>

            <button
              onClick={handleSubmit(handleCreateCard)}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-blue text-white font-inter text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 active:scale-95 transition"
            >
              <img src={saveIcon} alt="" />
              Salvar card
            </button>
          </div>

          <button
            onClick={() => setGenerate(!showGenerate)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-500 text-white font-inter text-sm font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 active:scale-95 transition"
          >
            <img src={genIcon} alt="" />
            Gerar Card com IA
          </button>
        </section>

        <section className="w-full max-w-md sm:max-w-xl lg:max-w-3xl flex flex-col gap-6 border border-cyan-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-cyan-secondary font-exo2 font-bold text-xl sm:text-2xl md:text-3xl">
              Cards ({dataDeck?.data.cards.length})
            </h4>

            <button
              onClick={() => {
                if (dataDeck?.data.cards.length !== 0) {
                  navigate(`/categories/deck-view/${deckId}`, {
                    replace: true,
                  });
                }
              }}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white font-inter text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-white/10 active:scale-95 transition"
            >
              <img src={eyeIcon} height={16} width={16} alt="" />
              Visualizar
            </button>
          </div>

          <div className="p-2 sm:p-4 max-h-48 sm:max-h-56 md:max-h-64 overflow-y-auto no-scrollbar flex flex-col gap-4">
            {dataDeck?.data.cards.map((card) => (
              <CardCardsComponent
                front={card.question}
                back={card.answer}
                id={card.id}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
