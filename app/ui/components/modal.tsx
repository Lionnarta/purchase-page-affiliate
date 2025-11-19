import clsx from "clsx";
import { HTMLAttributes } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  showModal: boolean;
}

export function Modal({ showModal, children, className, ...rest }: ModalProps) {
  if (!showModal) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300",
        showModal ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "bg-white px-6 py-4 rounded-md flex flex-col",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}
