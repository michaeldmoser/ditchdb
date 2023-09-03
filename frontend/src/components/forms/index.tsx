import { forwardRef, useId } from "react";

type TextFieldProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...props }: TextFieldProps, ref) => {
    const id = useId();
    return (
      <div className="my-4">
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          {label}
        </label>
        <input
          id={id}
          type="text"
          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);
