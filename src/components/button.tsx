import { cls } from "@/libs/utils";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  text: string;
  onClick: () => void;
}

const Button = ({ size = "sm", text, onClick }: ButtonProps) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 text-sm";
  } else if (size === "md") {
    btnSize = "py-3 text-base";
  } else if (size === "lg") {
    btnSize = "py-4 text-lg";
  }

  return (
    <button
      className={cls(
        `${btnSize} mt-5 w-full bg-primaryB-400 hover:bg-primaryB-500 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 focus:border-primaryB-400`
      )}
    >
      {text}
    </button>
  );
};

export default Button;
