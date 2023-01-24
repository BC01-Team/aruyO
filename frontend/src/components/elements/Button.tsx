import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode,
  type?: "button" | "submit",
  style?: "Primary"
};

const Button = ({
  children,
  type,
  style
}: ButtonProps) => {
  const defaultStyle = "inline-block rounded-md border border-transparent bg-amber-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75";
  const primaryStyle = "inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-amber-600 hover:bg-amber-50";

  return (
    <button
      type={type}
      className={style === "Primary" ? primaryStyle : defaultStyle}
    >
      {children}
    </button>
  );
};

export default Button;