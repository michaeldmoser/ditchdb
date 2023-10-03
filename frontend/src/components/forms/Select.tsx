import React from "react";
import { useId } from "@radix-ui/react-id";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import cx from "@/utils/cx";
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";

export default function Select(
  {
    label,
    name,
    placeholder,
    options = [],
    disabled = false,
    required = false,
  }: SelectProps,
) {
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
      <Root name={name} disabled={disabled} required={required}>
        <Trigger
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
        >
          <Value placeholder={placeholder} />
          <Icon
            className={cx(
              "text-white",
              "dark:text-gray-400",
              "grid",
              "justify-end",
            )}
          >
            <ChevronDownIcon />
          </Icon>
        </Trigger>
        <Portal>
          <Content
            className={cx(
              "w-72",
              "hidden",
              "z-10",
              "mt-2",
              "min-w-[15rem] bg-white",
              "shadow-md",
              "rounded-lg",
              "p-2",
              "dark:bg-gray-800",
              "dark:border",
              "dark:border-gray-700",
              "dark:divide-gray-700",
            )}
          >
            <ScrollUpButton
              className={cx(
                "flex",
                "items-center",
                "justify-center",
                "h-[25px] bg-white",
                "dark:bg-gray-800",
                "text-violet11",
                "cursor-default",
              )}
            >
              <ChevronUpIcon />
            </ScrollUpButton>
            <Viewport className="p-[5px]">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Viewport>
            <ScrollDownButton
              className={cx(
                "flex",
                "items-center",
                "justify-center",
                "h-[25px] bg-white",
                "dark:bg-gray-800",
                "text-violet11",
                "cursor-default",
              )}
            >
              <ChevronDownIcon />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    </div>
  );
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }: SelectItemProps, forwardedRef) => {
    return (
      <Item
        {...props}
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
        <ItemText>{children}</ItemText>
        <ItemIndicator>
          <CheckIcon />
        </ItemIndicator>
      </Item>
    );
  },
);

type SelectItemProps = React.ComponentProps<typeof Item> & {
  value: string;
};

type SelectProps = {
  label: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;
