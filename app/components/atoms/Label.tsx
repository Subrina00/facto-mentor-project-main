import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const labelVariants = cva("font-onest", {
    variants: {
        variant: {
            default: "sm:text-[16px]/[20px] text-[15px]/[20px] font-[600] block text-black mb-[10px]",
            grayLabel:
                "sm:text-[16px]/[20px] text-[15px]/[20px] cursor-pointer font-[400] flex items-center justify-start gap-x-[10px] text-gray mb-[10px]",
            contactLabel:
                "md:text-[18px]/[100%] sm:text-[16px]/[20px] text-[15px]/[20px] font-[500] flex items-center justify-start  text-black mb-[12px]",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type LabelProps = VariantProps<typeof labelVariants> & {
    className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({
    variant,
    className,
    children,
    ...props
}) => {
    return (
        <label className={cn(labelVariants({ variant, className }))} {...props}>
            {children}
        </label>
    );
};

export default Label;
