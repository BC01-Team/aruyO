import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  style?: "primary";
  onClick?: () => void;
};

const Button = ({ children, type, style, onClick }: ButtonProps) => {
  // 枠あり黒文字オレンジ角丸ボタン、チェックイン等で使用。
  const defaultStyle =
    "rounded-full border border-solid border-black py-2 px-40 w-full text-gray-900 bg-amber-400";
  // 枠あり黒文字オレンジ角丸ボタン、ログアウト等で使用
  const primaryStyle =
    "rounded-full border border-solid border-black py-2 px-4 text-gray-900 bg-amber-400";

  return (
    <button
      type={type}
      className={style === "primary" ? primaryStyle : defaultStyle} // style="primary"を指定した場合はprimaryStyleを適用、それ以外はdefaultStyleを適用
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
