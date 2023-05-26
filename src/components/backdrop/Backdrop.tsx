import { ReactNode, useCallback, useEffect } from "react";
import s from "./backdrop.module.css";
interface IBackdrop {
  children?: ReactNode;
  handleBackdrop: () => void;
}
export const Backdrop = ({ children, handleBackdrop }: IBackdrop) => {
  const handleClickBackdrop = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === "backdrop") {
      handleBackdrop();
    }
  };

  const closeBackdrop = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBackdrop();
      }
    },
    [handleBackdrop]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeBackdrop);

    return () => {
      window.removeEventListener("keydown", closeBackdrop);
    };
  }, [closeBackdrop]);

  return (
    <div id="backdrop" onClick={handleClickBackdrop} className={s.backdrop}>
      {children}
    </div>
  );
};
