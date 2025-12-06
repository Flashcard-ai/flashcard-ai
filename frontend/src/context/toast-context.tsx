import { createContext, useCallback, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ToastTypes = "success" | "info" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastTypes;
}

interface ToastContextData {
  addToast: (message: string, type: ToastTypes) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);

export const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastTypes) => {
      const id = Date.now() + Math.random();

      const newToast = { id, type, message };
      setToasts((state) => [...state, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 600, opacity: 0.4, transition: { duration: 0.3 } }}
              transition={{ duration: 0.2 }}
              className={`
              flex flex-col justify-between min-w-[300px] p-4 rounded-md shadow-lg text-white transform transition-all duration-300 animate-slide-in
              ${toast.type === "success" ? "bg-pink-secondary" : ""}
              ${toast.type === "error" ? "bg-red-500" : ""}
              ${toast.type === "info" ? "bg-yellow-500" : ""}
            `}
            >
              <h4>
                {toast.type === "success"
                  ? "Sucesso!"
                  : toast.type === "error"
                  ? "Erro!"
                  : toast.type === "info"
                  ? "Informação!"
                  : ""}
              </h4>
              <span className="font-medium text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
