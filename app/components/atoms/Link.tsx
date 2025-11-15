import { cva, type VariantProps } from "class-variance-authority";
import { Link, useLocation, type LinkProps } from "react-router";
import { cn } from "~/lib/utils";

const linkVariants = cva("text-textColor-1 duration-150 font-pretendard", {
  variants: {
    variant: {
      default:
        "sm:text-[18px]/[24px] text-[16px]/[20px] hover:text-primary font-normal font-onest text-gray cursor-pointer",
    },
    size: {
      defaultSecond:
        "py-[6px] sm:py-[8px] md:py-[12px] xl:py-[15px] rounded-[5px] sm:rounded-[6px] md:rounded-[8px] xl:rounded-lg outline-0 text-center transition-all duration-150 text-primary font-medium",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkButtonProps = VariantProps<typeof linkVariants> & {
  activeClassName?: string;
} & (LinkProps | React.ButtonHTMLAttributes<HTMLButtonElement>);

const LinkButton: React.FC<LinkButtonProps> = ({
  variant,
  size,
  className,
  activeClassName,
  children,
  ...props
}) => {
  const isLocationActive = "to" in props && useLocation().pathname === props.to;

  const classes = cn(
    linkVariants({ variant, size, className }),
    isLocationActive && activeClassName
  );

  if ("to" in props) {
    // It's a Link
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // It's a button
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default LinkButton;
