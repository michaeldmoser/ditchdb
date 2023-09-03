import { ComponentProps, forwardRef, HTMLProps } from "react";
import cx from "@/utils/cx";

type ButtonProps =
  & ComponentProps<"button">
  & {
    color?: string;
    primary?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, type = "button", ...props }, ref) => {
    const baseClasses =
      "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm";

    const colorClasses =
      `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`;

    return (
      <button
        type={type}
        className={cx(baseClasses, colorClasses, className)}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export const OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>((
  { children, className, type = "button", ...props }: ButtonProps,
  ref,
) => {
  const baseClasses =
    "py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500";

  return (
    <button
      type={type}
      className={cx(baseClasses, className)}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});
