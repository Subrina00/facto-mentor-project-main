import { cva, type VariantProps, } from "class-variance-authority";
import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

const textAreaVariants = cva("font-onest font-normal outline-none rounded-[12px]", {
  variants: {
    variant: {
      default: "text-[16px]/[20px] text-black placeholder:text-[#C7C7C7] resize-none border border-[#C7C7C7]",
    },
    size: {
      default: "w-full sm:py-[13px] py-[10px] sm:px-[24px] px-[18px]",
      applyFieldSize: "w-full sm:py-[16px] py-[13px] sm:px-[24px] px-[18px]",
      auto: "w-auto",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type InputBoxProps = VariantProps<typeof textAreaVariants> & {
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaBox = forwardRef<HTMLTextAreaElement, InputBoxProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textAreaVariants({ variant, size, className }))}
        {...props}
      ></textarea>
    );
  }
);

export default TextAreaBox;
