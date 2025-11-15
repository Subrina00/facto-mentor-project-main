import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const titleVariants = cva("font-pretendard", {
  variants: {
    variant: {
      default:
        "md:text-[18px]/[30px] text-[16px]/[22px]  text-black font-[800] sm:mb-[16px] mb-[10px]",
      paragraph: "text-black text-[14px]/[24px] font-[400] mb-[16px]",
      authTitle:
        "text-black-blue font-[800] text-[32px]/[48px] block mb-[12px]",
      authParagraph: "text-gray font-[400] text-[18px]/[26px] block mb-[12px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: ReactNode;
} & VariantProps<typeof titleVariants> &
  HTMLAttributes<HTMLElement>;

const Title: React.FC<TitleProps> = ({
  as: Element = "h1",
  variant,
  className,
  children,
  ...props
}) => (
  <Element className={titleVariants({ variant, className })} {...props}>
    {children}
  </Element>
);

export default Title;
