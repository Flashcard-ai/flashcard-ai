import { useQueryClient } from "@tanstack/react-query";
import deleteIcon from "../../../assets/delete-icon.png";
import { useDeleteCard } from "../../../hooks/useCard";
import { useToast } from "../../../hooks/useToast";

interface CardCardsProps {
  front: string;
  back: string;
  id: number;
}

export const CardCardsComponent = ({ front, back, id }: CardCardsProps) => {
  const { addToast } = useToast();
  const { mutate: mutateDeleteCard } = useDeleteCard(addToast);
  const queryClient = useQueryClient();

  const deleteCard = () => {
    mutateDeleteCard(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-decks"] });
      },
    });
  };

  return (
    <div className="flex justify-between items-center border border-cyan-200 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <h6 className="text-cyan-secondary font-inter font-bold">{front}</h6>
        <span className="text-gray-600 font-inter font-bold">{back}</span>
      </div>

      <button
        onClick={deleteCard}
        className="md:cursor-pointer hover:scale-120 transition-transform ease-in duration-100"
      >
        <img src={deleteIcon} height={16} width={16} />
      </button>
    </div>
  );
};
