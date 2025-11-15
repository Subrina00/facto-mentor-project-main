import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "outline-0 font-pretendard text-center transition-all cursor-pointer duration-300 transition-ease",
  {
    variants: {
      variant: {
        default: "bg-primary text-white text-[18px]/[26px] font-[500]",
        authButton:
          "bg-primary w-full block text-white text-[18px]/[26px] font-[500] mb-[12px]",
      },
      size: {
        default: "px-[30px] py-[10px] rounded-[8px]",
        authBtnSize: "px-[20px] py-[11px] rounded-[8px]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  className,
  children,
  ...props
}) => {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
