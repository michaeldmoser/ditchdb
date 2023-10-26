import React, { forwardRef } from "react";
import { useId } from "@radix-ui/react-id";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import cx from "@/utils/cx";

const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    options = [],
    disabled = false,
    required = false,
    placeholder = "Select an option…",
    ...props
  }: SelectProps,
  ref,
) => {
  const labelledBy = useId();
  return (
    <div className="my-4">
      <label
        htmlFor={labelledBy}
        className={cx(
          "block",
          "text-sm",
          "font-medium",
          "mb-2",
          "dark:text-white",
          disabled && "opacity-50",
        )}
      >
        {label}
        {required && " *"}
      </label>
      <select
        id={labelledBy}
        className={cx(
          "py-3",
          "px-4",
          "grid",
          "grid-cols-2",
          "items-center",
          "text-left",
          "gap-2",
          "rounded-md",
          "border",
          "font-medium",
          "bg-white",
          "text-gray-700",
          "shadow-sm",
          "align-middle",
          "hover:bg-gray-50",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
          "focus:ring-offset-white",
          "focus:ring-blue-600",
          "transition-all",
          "text-sm",
          "dark:bg-slate-900",
          "dark:hover:bg-slate-800",
          "dark:border-gray-700",
          "dark:text-gray-400",
          "dark:hover:text-white",
          "dark:focus:ring-offset-gray-800",
          "w-full",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "disabled:dark:hover:bg-slate-900",
          "disabled:dark:hover:text-gray-400",
        )}
        {...props}
        ref={ref}
        defaultValue={""}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </select>
    </div>
  );
});

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, className, value, ...props }: SelectItemProps, forwardedRef) => {
    return (
      <option
        {...props}
        value={value?.toString()}
        ref={forwardedRef}
        className={cx(
          "flex",
          "items-center",
          "gap-x-3.5",
          "py-2",
          "px-3",
          "rounded-md",
          "text-sm",
          "text-gray-800",
          "hover:bg-gray-100",
          "focus:ring-2",
          "focus:ring-blue-500",
          "dark:text-gray-400",
          "dark:hover:bg-gray-700",
          "dark:hover:text-gray-300",
          className,
        )}
      >
        {children}
      </option>
    );
  },
);

export default Select;

type SelectItemProps = React.OptionHTMLAttributes<HTMLOptionElement>;

type SelectProps = {
  label: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string | number }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;
