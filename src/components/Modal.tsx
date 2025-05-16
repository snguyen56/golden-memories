import { RefObject } from "react";

type Props = {
  children: React.ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export const openDialog = (dialogRef: RefObject<HTMLDialogElement | null>) => {
  if (dialogRef.current) {
    dialogRef.current.showModal();
  }
};

export const closeDialog = (dialogRef: RefObject<HTMLDialogElement | null>) => {
  if (dialogRef.current) {
    dialogRef.current.close();
  }
};

function Modal({ children, dialogRef }: Props) {
  return (
    <dialog
      ref={dialogRef}
      className="mx-auto mt-15 h-8/10 w-8/10 overflow-hidden rounded-xl text-zinc-600"
    >
      {children}
    </dialog>
  );
}

export default Modal;
