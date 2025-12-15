import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import genIcon from "../../../assets/gen-icon.png";

interface ModalGenerateCardIAProps {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  handleCreateCardIA: (prompt: string, url: string) => void;
}

export const ModalGenerateCardIAComponent = ({
  showModal,
  setShowModal,
  handleCreateCardIA,
}: ModalGenerateCardIAProps) => {
  const modalSchema = z.object({
    prompt: z
      .string()
      .min(10, "Descreva melhor o conteúdo (mínimo 10 caracteres)"),
    source: z
      .string()
      .min(5, "Fonte obrigatória")
      .refine((val) => /^https?:\/\/.+/.test(val), "URL inválida"),
  });

  type ModalType = z.infer<typeof modalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModalType>({
    resolver: zodResolver(modalSchema),
  });

  const handleGenerate = (data: ModalType) => {
    handleCreateCardIA(data.prompt, data.source);
    setShowModal(false);
    reset();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md sm:max-w-lg flex flex-col gap-6 rounded-xl border border-cyan-200 bg-gradient-gblack p-4 sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl sm:text-2xl font-bold font-exo2 bg-gradient-blue bg-clip-text text-transparent">
            Gerar card com IA
          </h3>
          <p className="text-cyan-secondary text-xs sm:text-sm font-inter">
            Descreva o conteúdo e informe a fonte
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleGenerate)}
          className="flex flex-col gap-4"
        >
          <div className="w-full">
            <textarea
              placeholder="Ex: Questões sobre javascript"
              className="w-full h-32 sm:h-40 resize-none outline-none border border-cyan-200 rounded-md p-4 text-sm sm:text-base text-white placeholder:text-white bg-transparent"
              {...register("prompt")}
            />
            {errors.prompt && (
              <p className="text-red-500 pl-2 text-sm mt-1">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="URL da fonte"
              className="w-full outline-none border border-cyan-200 rounded-md p-3 text-sm sm:text-base text-white placeholder:text-white bg-transparent"
              {...register("source")}
            />
            {errors.source && (
              <p className="text-red-500 pl-2 text-sm mt-1">
                {errors.source.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowModal(!showModal);
                reset();
              }}
              className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-white/20 text-white font-inter text-sm font-medium hover:bg-white/10 transition active:scale-95"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-blue text-white font-inter text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition active:scale-95"
            >
              <img src={genIcon} alt="" />
              Gerar card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
