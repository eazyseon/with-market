import { cls } from "@/libs/client/utils";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ size = "sm", text, onClick, disabled }: ButtonProps) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 text-sm";
  } else if (size === "md") {
    btnSize = "py-3 text-base";
  } else if (size === "lg") {
    btnSize = "py-4 text-lg";
  }

  let btnBg = "";
  if (disabled) {
    btnBg = "bg-gray-400";
  } else {
    btnBg = "bg-primaryB-400 hover:bg-primaryB-500";
  }

  return (
    <button
      disabled={disabled}
      className={cls(
        `${btnSize} ${btnBg} w-full text-white px-4 border border-transparent 
        rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 
        focus:border-primaryB-400`
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
