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
    <dialog ref={dialogRef}>
      <div
        className="fixed inset-0 overflow-y-auto"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog(dialogRef);
          }
        }}
      >
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
