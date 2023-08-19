import { ComponentProps, HTMLProps } from "react";
import cx from "@/utils/cx";

type ButtonProps =
  & ComponentProps<"button">
  & {
    color?: string;
    primary?: boolean;
  };

export function Button(
  { children, className, type = "button", ...props }: ButtonProps,
) {
  const baseClasses =
    "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm";

  const colorClasses =
    `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`;

  return (
    <button
      type={type}
      className={cx(baseClasses, colorClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
}
