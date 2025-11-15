import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

const inputVariants = cva(
    "font-onest font-normal outline-none rounded-[12px]",
    {
        variants: {
            variant: {
                default:
                    "text-[16px]/[20px] text-black placeholder:text-[#C7C7C7] border border-[#C7C7C7]",
            },
            size: {
                default: "w-full sm:py-[13px] py-[10px] sm:px-[24px] px-[18px]",
                applyFieldSize: "w-full sm:py-[16px] py-[13px] sm:px-[24px] px-[18px]",
                contactFieldSize: "w-full py-[11px] px-[24px]",
                auto: "w-auto",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type InputBoxProps = VariantProps<typeof inputVariants> & {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
    ({ variant, size, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(inputVariants({ variant, size, className }))}
                {...props}
            />
        );
    }
);

export default InputBox;
