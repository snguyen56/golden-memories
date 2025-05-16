import { RefObject, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export const openDialog = (dialogRef: RefObject<HTMLDialogElement | null>) => {
  if (dialogRef.current) {
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";
  }
};

export const closeDialog = (dialogRef: RefObject<HTMLDialogElement | null>) => {
  if (dialogRef.current) {
    dialogRef.current.close();
    document.body.style.overflow = "";
  }
};

function Modal({ children, dialogRef }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="mx-auto mt-15 h-8/10 w-8/10 overflow-hidden overflow-y-auto rounded-xl text-zinc-600"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog(dialogRef);
        }
      }}
    >
      {children}
    </dialog>
  );
}

export default Modal;
