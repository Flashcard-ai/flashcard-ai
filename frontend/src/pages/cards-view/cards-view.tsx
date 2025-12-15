import { useNavigate, useParams } from "react-router";
import { ReturnButton } from "../../components/return-button";
import { useEffect, useState } from "react";
import type { Side } from "../cards/cards";
import rotateIcon from "../../assets/rotate-icon.png";
import leftIcon from "../../assets/left-card-icon.png";
import rightIcon from "../../assets/right-card-icon.png";
import { motion } from "framer-motion";
import { useDeck } from "../../hooks/useDeck";

export const CardsViewPage = () => {
  const { id } = useParams();
  const [side, setSide] = useState<Side>("front");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const deckId = Number(id);
  const { data: dataDeck, error, isError } = useDeck(deckId);

  useEffect(() => {
    if (isNaN(deckId)) {
      navigate(-1);
      return;
    }

    if (isError || error || dataDeck?.data.cards.length === 0) {
      navigate(-1);
      return;
    }
  }, [deckId, isError, error, navigate]);

  const nextCard = () => {
    if (!dataDeck?.data.cards.length) return;

    if (index < dataDeck.data.cards.length - 1) {
      setIndex(index + 1);
      setSide("front");
    }
  };

  const previousCard = () => {
    if (dataDeck?.data.cards.length == null) return;

    if (index != 0) {
      setIndex(index - 1);
      setSide("front");
    }
  };

  if (!dataDeck) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  if (dataDeck.data.cards.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-gblack flex flex-col p-4 md:p-8">
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 text-white">
          <p className="text-lg">Este deck ainda não possui cards.</p>
          <ReturnButton to={`/categories/deck/${deckId}`} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-gblack flex flex-col p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <ReturnButton to={`/categories/deck/${deckId}`} />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-3xl md:text-5xl font-bold font-exo2 bg-gradient-blue bg-clip-text text-transparent leading-tight">
              Visualizando deck
            </h1>
            <h6 className="text-cyan-secondary text-sm font-inter font-medium tracking-wide">
              Card 1 de 1
            </h6>
          </div>
        </div>
      </div>

      <main className="flex justify-center items-center my-10">
        <div className="relative w-[75vw] h-[30vw] perspective-[1200px]">
          <motion.div
            animate={{ rotateY: side === "front" ? 0 : 180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 border border-cyan-secondary rounded-lg p-6 flex items-center justify-center text-2xl font-bold"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="bg-gradient-blue text-transparent bg-clip-text text-2xl font-exo font-bold">
                {dataDeck?.data.cards[index].question}
              </span>
            </div>
            <div
              className="absolute inset-0 border border-cyan-secondary rounded-lg p-6 flex items-center justify-center text-2xl font-bold"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <span className="bg-gradient-blue text-transparent bg-clip-text text-2xl font-exo font-bold">
                {dataDeck?.data.cards[index].answer}
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="flex gap-6">
        <button
          onClick={previousCard}
          className="sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-inter text-sm font-medium backdrop-blur-sm hover:bg-white/10 active:scale-95 transition"
        >
          <img src={leftIcon} height={16} width={16} />
          Anterior
        </button>
        <button
          onClick={() => setSide(side === "front" ? "back" : "front")}
          className="sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-inter text-sm font-medium backdrop-blur-sm hover:bg-white/10 active:scale-95 transition"
        >
          <img src={rotateIcon} height={16} width={16} />
          Virar
        </button>
        <button
          onClick={nextCard}
          className="sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-inter text-sm font-medium backdrop-blur-sm hover:bg-white/10 active:scale-95 transition"
        >
          Próximo
          <img src={rightIcon} height={16} width={16} />
        </button>
      </div>
    </div>
  );
};
