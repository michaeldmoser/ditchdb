import React, { Children, HTMLProps, ReactElement } from "react";
import { findChild } from "@/utils/children";

/**
 * Card component
 * Render a card with a header and body
 */
export function Card({ children }: CardProps) {
  const header = findChild(children, CardHeader);
  const body = findChild(children, CardBody);

  return (
    <div className="flex flex-col my-4 bg-white shadow-md  dark:shadow-sm rounded-xl dark:bg-gray-800 dark:shadow-slate-700">
      {header}
      {body}
    </div>
  );
}

/**
 * CardHeader component
 * Render the header section of a card
 */
export function CardHeader({ children }: HTMLProps<HTMLElement>) {
  const headerContent = typeof children === "string"
    ? <Heading>{children}</Heading>
    : children;
  return (
    <header className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
      {headerContent}
    </header>
  );
}

/**
 * Render the body section of a card
 */
export function CardBody({ children }: HTMLProps<HTMLElement>) {
  return (
    <div className="p-4 md:p-5">
      {children}
    </div>
  );
}

/**
 * A generic heading for a card
 */
export function Heading({ children, level = 3 }: CardHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className="text-lg font-bold text-gray-800 dark:text-white">
      {children}
    </Tag>
  );
}

type CardKids = ReactElement<typeof CardBody> | ReactElement<typeof CardHeader>;

type CardProps = HTMLProps<HTMLElement> & {
  children: CardKids | CardKids[];
};

type CardHeadingProps = HTMLProps<HTMLElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
