import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "cursor-pointer px-10 py-2 border border-primary rounded-md bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors duration-300",
        className
      )}
    >
      {children}
    </button>
  );
}
