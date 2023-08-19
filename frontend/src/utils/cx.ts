import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Easily combine CSS classes conditionally on an element and merge Tailwind classes. This function is a wrapper around `clsx` and `tailwind-merge` to make it easier to
 */
export default function cx(...args: any[]) {
  const classes = clsx(...args);
  return twMerge(classes);
}
