import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";

const inputVariants = cva("font-onest", {
    variants: {
        variant: {
            default:
                "min-w-[14px] max-w-[14px] h-[14px] sm:min-w-[15px] sm:max-w-[15px] sm:h-[15px] lg:min-w-[16px] lg:max-w-[16px] lg:h-[16px] xl:min-w-[18px] xl:max-w-[18px] xl:h-[18px] cursor-pointer appearance-none border-[1px] border-[#A6A6A6] outline-none rounded-[3px] sm:rounded-[4px] relative overflow-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-primary after:invisible after:opacity-0 checked:after:visible checked:after:opacity-100 checked:border-primary before:content-['✓'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-10 before:text-white before:font-pretendard before:light-normal before:text-[11px] lg:before:text-[13px] xl:before:text-[14px] before:pt-[2px] lg:before:pt-0 xl:before:pt-[0.5px] before:opacity-0 before:invisible checked:before:opacity-100 checked:before:visible",
        },
        size: {
            default: "w-full",
            auto: "w-auto",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type InputCheckboxProps = VariantProps<typeof inputVariants> & {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
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

export default InputCheckbox;
